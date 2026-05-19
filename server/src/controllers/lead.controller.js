const leadModel = require("../models/lead.model");
const {
  allocateProvidersToLead,
} = require("../services/leadAllocation.service");

async function createLead(req, res) {
  try {
    const { name, phone, city, serviceType, description } = req.body;

    const lead = await leadModel.create({
      name: name,
      phone: phone,
      city: city,
      serviceType: serviceType,
      description: description,
    });

    const assignedProviders = await allocateProvidersToLead(lead);

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead,
      assignedProviders,
    });
  } catch (error) {
    console.log(error);

    //Duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This phone number already submitted this service request",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
}

module.exports = { createLead };
