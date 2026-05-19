const mongoose = require("mongoose");

const webhookLogSchema = new mongoose.Schema(
  {
    webhookId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const webhookLogModel = mongoose.model("webhookLog", webhookLogSchema);

module.exports = webhookLogModel;
