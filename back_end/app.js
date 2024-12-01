const express = require("express");
const faqRoutes = require("./routes/faqRoutes");
const workflowRoutes = require("./routes/workflowRoutes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const globalErrorHandling = require("./controllers/errorController");
const importData = require("./import");
const fs = require("fs");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");

dotenv.config({ path: ".env" });

const app = express();

// Cors Config
app.use(cors());

// Parsing Incoming Data
app.use(express.json());
app.use(cookieParser());

//Importing data
// const data = JSON.parse(
//   fs.readFileSync("./data/workflows.json", { encoding: "utf8" })
// );
// importData(data, Workflow);

// Routes
app.use("/api/v1/faqs", faqRoutes);
app.use("/api/v1/workflows", workflowRoutes);
app.use("/api/v1/categories", categoryRoutes);

// Global Error Handling Middleware
app.use(globalErrorHandling);

module.exports = app;
