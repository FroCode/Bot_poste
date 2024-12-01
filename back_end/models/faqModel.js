const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  id: Number,
  question: {
    type: String,
    required: [true, "question is required"],
    unique: true,
  },
  answer: {
    type: String,
    required: [false, "Answer is required"],
  },
  type: {
    type: String,
    required: [true, "type is required"],
    enum: ["type 1", "type 2"],
  },
  category: String,
  picklist: Array,
  isRequired: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

const Faq = mongoose.model("Faq", faqSchema);

module.exports = Faq;
