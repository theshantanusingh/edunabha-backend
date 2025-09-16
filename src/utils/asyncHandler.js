/**
 * @file asyncHandler.js
 * @description Utility to wrap async route handlers and forward errors to Express error middleware.
 *
 * @example
 * const asyncHandler = require("../utils/asyncHandler");
 * 
 * router.get(
 *   "/users/:id",
 *   asyncHandler(async (req, res) => {
 *     const user = await User.findById(req.params.id);
 *     res.json(user);
 *   })
 * );
 */

/**
 * Wraps an async route handler to catch errors and pass them to Express's next().
 *
 * @param {Function} fn - The async route handler function (req, res, next).
 * @returns {Function} Wrapped handler with automatic error catching.
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;