/**
 * @file errorHandler.js
 * @description Global error handling middleware for Express.
 */

const logger = require("../utils/logger");

/**
 * Express error-handling middleware.
 *
 * @param {Error} err - The error object.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 */

const errorHandler = (err, req, res, next) => {
  // If error is already an ApiError, use its statusCode. Otherwise, default to 500.
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log error (with stack only in dev mode)
  if (process.env.NODE_ENV === "development") {
    logger.error(`❌ ${statusCode} - ${message} - ${req.originalUrl}`);
    logger.error(err.stack);
  } else {
    logger.error(`❌ ${statusCode} - ${message}`);
  }

  // Send clean response
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

module.exports = errorHandler;