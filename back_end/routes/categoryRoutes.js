const express = require("express");
const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require("./../controllers/categoryController");
const router = express.Router();

router.post("/create-category", createCategory);
router.get("/get-categories", getAllCategories);
router.delete("/delete-category", deleteCategory);

module.exports = router;
