const asyncHandler = require("express-async-handler");
const AppError = require("./../utils/appError");
const Workflow = require("./../models/workflowModel");
const Category = require("../models/categoryModel");

const getWorkflows = asyncHandler(async (req, res, next) => {
  try {
    let workflows = await Workflow.find().lean();
    if (!workflows) {
      return res.status(404).json({
        status: "error",
        message: "No workflows found",
      });
    }
    workflows = workflows.map((workflow, index) => ({
      ...workflow,
      displayId: index + 1,
    }));

    res.status(200).json({
      status: "success",
      results: workflows.length,
      data: { workflows },
    });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

const getOneWorkflow = asyncHandler(async (req, res, next) => {
  const workflowId = req.params.workflowId;
  const workflow = await Workflow.findById(workflowId).populate("questions");

  if (!workflow) {
    return next(new AppError("error fetching the workflow", 404));
  }

  res.status(200).json({
    status: "success",
    data: { workflow },
  });
});

const createWorkflow = asyncHandler(async (req, res, next) => {
  const { name, answer, status, categoryName, faqs } = req.body;

  if (!name || !answer || !status || !categoryName) {
    return next(new AppError("please provide all fields required", 400));
  }

  const categoryDocument = await Category.findOne({ name: categoryName });

  if (!categoryDocument) {
    return next(
      new AppError(`No category has found with this name: ${categoryName}`)
    );
  }

  const category = categoryDocument._id;

  const workflow = await Workflow.create({
    name,
    answer,
    status,
    category,
    // questions,
  });

  res.status(201).json({
    status: "success",
    data: { workflow },
  });
});

const deleteWorkflow = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const workflow = await Workflow.findById(id);
  if (!workflow) {
    return next(new AppError(`No workflow found with id: ${id}`, 404));
  }
  await Workflow.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const updateWorkflow = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const workflow = Workflow.findById(id);
  if (!workflow) {
    return next(new AppError(`No workflow found with id: ${id}`, 404));
  }
  const updatedWorkflow = await Workflow.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedWorkflow,
    },
  });
});

const deleteWorkflows = asyncHandler(async (req, res) => {
  await Workflow.deleteMany();
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  getWorkflows,
  createWorkflow,
  deleteWorkflow,
  updateWorkflow,
  deleteWorkflows,
  getOneWorkflow,
};
