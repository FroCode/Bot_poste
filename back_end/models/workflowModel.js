const mongoose = require("mongoose");

const workflowSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    answer: { type: String, required: true },
    status: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    faqs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Faq" }],
    lastRun: { type: Date, default: null }, // Add lastRun field
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

const Workflow = mongoose.model("Workflow", workflowSchema);

module.exports = Workflow;
