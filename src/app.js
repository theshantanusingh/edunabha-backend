/**
 * @file app.js
 * @description Express app configuration with middleware.
 */

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 
app.use(morgan("dev")); 

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.get("/test", (req, res) => {
  throw new Error("Test error!");
});

app.use(errorHandler);

module.exports = app;
