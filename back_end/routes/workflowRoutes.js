const express = require("express");
const {
  getWorkflows,
  deleteWorkflow,
  createWorkflow,
  updateWorkflow,
  deleteWorkflows,
  getOneWorkflow,
} = require("./../controllers/workflowController");

const router = express.Router();

router.get("/get-workflows", getWorkflows);
router.get("/get-one-workflow/:workflowId", getOneWorkflow);
router.post("/create-workflow", createWorkflow);
router.delete("/delete-workflow/:id", deleteWorkflow);
router.delete("/delete-workflows", deleteWorkflows);
router.patch("/update-workflow/:id", updateWorkflow);

module.exports = router;
