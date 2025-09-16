/**
 * @file ApiError.js
 * @description Custom error class to standardize API errors with HTTP status codes.
 */

class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {number} statusCode - HTTP status code (e.g., 400, 404, 500).
   * @param {string} message - Error message for client.
   * @param {string} [stack] - Optional stack trace.
   */
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
