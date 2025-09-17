/**
 * @file auth.controller.js
 * @description Controller functions for user authentication (signup, login).
 */

const User = require("../models/User.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

/**
 * Generate JWT tokens
 * @param {Object} user - Mongoose user object
 */
const generateTokens = (user) => {
  const payload = { id: user._id, role: user.role };

  const accessToken = jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiry,
  });

  const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiry,
  });

  return { accessToken, refreshToken };
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 */
const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "Email already registered");

  const user = await User.create({ name, email, password, role });

  const tokens = generateTokens(user);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    tokens,
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 */
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(401, "Invalid credentials");

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  const tokens = generateTokens(user);

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    tokens,
  });
});

module.exports = { signup, login };