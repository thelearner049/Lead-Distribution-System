require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const providerModel = require("../models/provider.model");
const allocationStateModel = require("../models/allocationState.model");

async function seedData() {
  try {
    await connectDB();

    //deleting any old data
    await providerModel.deleteMany();
    await allocationStateModel.deleteMany();

    console.log("Old data cleared");

    //Creating providers

    const providers = [];

    for (let i = 1; i <= 8; i++) {
      providers.push({
        name: `Provider${i}`,
        monthlyQuota: 10,
        usedQuota: 0,
      });
    }

    await providerModel.insertMany(providers);

    console.log("Providers seeded");

    //Creating Allocation State
    const allocationStates = [
      {
        serviceType: "Service 1",
        currentIdx: 0,
      },
      {
        serviceType: "Service 2",
        currentIdx: 0,
      },
      {
        serviceType: "Service 3",
        currentIdx: 0,
      },
    ];

    await allocationStateModel.insertMany(allocationStates);

    console.log("Allocation States seeded");
    console.log("DB seeding complete");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedData();
