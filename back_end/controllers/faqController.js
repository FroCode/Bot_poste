const asyncHandler = require("express-async-handler");
const Faq = require("./../models/faqModel");
const AppError = require("./../utils/appError");

const getFaqs = asyncHandler(async (req, res) => {
  const faqs = await Faq.find().lean();
  const faqWithSequentialIds = faqs.map((faq, index) => ({
    ...faq,
    displayId: index + 1, // This gives us the sequential ID
  }));
  res.status(200).json({
    status: "success",
    results: faqWithSequentialIds.length,
    data: { faqWithSequentialIds },
  });
});

const createFaq = asyncHandler(async (req, res, next) => {
  let faq = {
    question: req.body.question,
    type: req.body.type,
    isRequired: req.body.isRequired,
    isActive: req.body.isActive,
  };

  if (faq.type === "type 1") {
    if (!req.body.picklist) {
      return next(
        new AppError("Please specify the category and picklist!", 400)
      );
    }
    faq.picklist = req.body.picklist;
  }

  if (faq.type === "type 2") {
    if (!req.body.answer) {
      return next(new AppError("Please specify the category and answer!", 400));
    }
    faq.answer = req.body.answer;
  }

  faq.category = req.body.category;

  const newFaq = await Faq.create(faq);

  res.status(201).json({
    status: "success",
    data: { newFaq },
  });
});

const getFaq = asyncHandler(async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return next(new AppError("No question has been provided", 404));
  }

  const faq = await Faq.findOne({ question });

  if (!faq) {
    return next(new AppError("Question not found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: { faq },
  });
});

const deleteFaqs = asyncHandler(async (req, res, next) => {
  await Faq.deleteMany();
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = { getFaqs, createFaq, getFaq, deleteFaqs };
