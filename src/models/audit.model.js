const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },

    userId: {
      type: String,
      default: null
    },

    metadata: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Audit", auditSchema);