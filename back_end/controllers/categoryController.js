const asyncHandler = require("express-async-handler");
const AppError = require("./../utils/appError");
const Category = require("./../models/categoryModel");

const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new AppError("please specify the name of category", 400));
  }

  const category = await Category.create({ name });

  res.status(201).json({
    status: "success",
    data: { category },
  });
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({
    status: "success",
    results: categories.length,
    data: { categories },
  });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.findOne({ name });

  if (!category) {
    return next(new AppError(`No category has found with name: ${name}`));
  }

  await Category.findByIdAndDelete(category._id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = { createCategory, getAllCategories, deleteCategory };
