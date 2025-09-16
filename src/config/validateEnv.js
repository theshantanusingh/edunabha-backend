/**
 * @file validateEnv.js
 * @description Validates required environment variables before starting the server.
 */

const dotenv = require("dotenv");
dotenv.config();

const logger = require('./../utils/logger');

/**
 * List of required environment variables.
 * @type {string[]}
 */
const requiredEnv = [
  "PORT",
  "NODE_ENV",
  "MONGO_URI",
  "JWT_ACCESS_SECRET",
  "JWT_ACCESS_EXPIRES",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_EXPIRES",
];

// Validate environment variables
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    logger.error(` Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

logger.info(" All environment variables loaded successfully");

module.exports = process.env;