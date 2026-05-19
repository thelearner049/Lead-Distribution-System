const mongoose = require("mongoose");

const leadAssignmentSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lead",
      required: true,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "provider",
      required: true,
    },
  },
  { timestamps: true },
);

// prevents from same provider getting same lead
leadAssignmentSchema.index({ lead: 1, provider: 1 }, { unique: true });

const leadAssignmentModel = mongoose.model(
  "leadAssignment",
  leadAssignmentSchema,
);

module.exports = leadAssignmentModel;
