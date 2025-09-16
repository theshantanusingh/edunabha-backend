/**
 * @file app.js
 * @description Express app configuration with middleware and proper error handling.
 */

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler"); 
const ApiError = require("./utils/ApiError"); 
const asyncHandler = require("./utils/asyncHandler"); 

const app = express();

app.use(helmet());
app.use(cors()); 
app.use(express.json()); 
app.use(morgan("dev")); 


app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.get(
  "/test",
  asyncHandler(async (req, res) => {
    throw new ApiError(400, "This is a custom test error!");
  })
);

app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

app.use(errorHandler);
module.exports = app;