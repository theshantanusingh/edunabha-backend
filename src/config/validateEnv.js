/**
 * @file validateEnv.js
 * @description Validates required environment variables before starting the server.
 */

const dotenv = require("dotenv");
dotenv.config();

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
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

console.log("✅ All environment variables loaded successfully");

module.exports = process.env;