const express = require("express");
const {
  getFaqs,
  getFaq,
  deleteFaqs,
  createFaq,
} = require("./../controllers/faqController");

const router = express.Router();

router.get("/get-faqs", getFaqs);
router.post("/get-faq", getFaq);
router.post("/create-faq", createFaq);
router.delete("/delete-faqs", deleteFaqs);

module.exports = router;
