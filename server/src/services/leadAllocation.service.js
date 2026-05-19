const mongoose = require("mongoose");
const providerModel = require("../models/provider.model");
const leadAssignmentModel = require("../models/leadAssignment.model");
const allocationStateModel = require("../models/allocationState.model");

const allocationRules = {
  "Service 1": {
    mandatoryProviders: ["Provider1"],
    poolProviders: ["Provider2", "Provider3", "Provider4"],
  },
  "Service 2": {
    mandatoryProviders: ["Provider5"],
    poolProviders: ["Provider6", "Provider7", "Provider8"],
  },
  "Service 3": {
    mandatoryProviders: ["Provider1", "Provider4"],
    poolProviders: [
      "Provider2",
      "Provider3",
      "Provider5",
      "Provider6",
      "Provider7",
      "Provider8",
    ],
  },
};

async function allocateProvidersToLead(lead) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const rules = allocationRules[lead.serviceType];

    const assignedProviders = [];

    for (const providerName of rules.mandatoryProviders) {
      const provider = await providerModel
        .findOne({ name: providerName })
        .session(session);

      //if quota exhausted -> skip
      if (provider.usedQuota >= provider.monthlyQuota) {
        continue;
      }

      assignedProviders.push(provider);
    }

    const allocationState = await allocationStateModel
      .findOne({
        serviceType: lead.serviceType,
      })
      .session(session);

    const remainingSlots = 3 - assignedProviders.length;

    const pool = rules.poolProviders;
    let currentIdx = allocationState.currentIdx;

    let selectedCount = 0;

    while (selectedCount < remainingSlots) {
      const providerName = pool[currentIdx % pool.length];

      const provider = await providerModel
        .findOne({ name: providerName })
        .session(session);

      const alreadyAssigned = assignedProviders.some(
        (p) => p._id.toString() === provider._id.toString(),
      );

      const quotaAvailable = provider.usedQuota < provider.monthlyQuota;

      if (!alreadyAssigned && quotaAvailable) {
        assignedProviders.push(provider);
        selectedCount++;
      }

      currentIdx++;
    }

    allocationState.currentIdx = currentIdx % pool.length;
    await allocationState.save({ session });

    for (const provider of assignedProviders) {
      await leadAssignmentModel.create(
        [
          {
            lead: lead._id,
            provider: provider._id,
          },
        ],
        { session },
      );

      await providerModel.updateOne(
        { _id: provider._id },
        {
          $inc: { usedQuota: 1 },
        },
        { session },
      );
    }

    await session.commitTransaction();
    session.endSession();

    return assignedProviders;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

module.exports = { allocateProvidersToLead };
