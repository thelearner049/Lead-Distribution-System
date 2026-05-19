const mongoose = require("mongoose");

const allocationStateSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      unique: true,
    },
    currentIdx: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const allocationStateModel = mongoose.model(
  "allocationState",
  allocationStateSchema,
);

module.exports = allocationStateModel;
