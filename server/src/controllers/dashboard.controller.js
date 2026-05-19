const leadAssignmentModel = require("../models/leadAssignment.model");
const providerModel = require("../models/provider.model");

async function getDashboardData(req, res) {
  try {
    const providers = await providerModel.find();

    const dashboardData = [];

    for (const provider of providers) {
      const assignments = await leadAssignmentModel
        .find({
          provider: provider._id,
        })
        .populate("lead")
        .populate("provider");

      const assignedLeads = assignments.map((assignment) => ({
        leadId: assignment.lead._id,
        customerName: assignment.lead.name,
        phone: assignment.lead.phone,
        city: assignment.lead.city,
        serviceType: assignment.lead.serviceType,
        description: assignment.lead.description,
      }));

      dashboardData.push({
        providerId: provider._id,
        providerName: provider.name,
        monthlyQuota: provider.monthlyQuota,
        usedQuota: provider.usedQuota,
        remainingQuota: provider.monthlyQuota - provider.usedQuota,
        leadsReceived: assignedLeads.length,
        assignedLeads,
      });
    }

    res.status(200).json({
      success: true,
      dashboardData,
    });
    
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
}

module.exports = { getDashboardData };
