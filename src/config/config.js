/**
 * @file config.js
 * @description Centralized configuration object for environment variables.
 */

const env = require("./validateEnv");

/**
 * Application configuration
 */
const config = {
  server: {
    port: env.PORT || 5000,
    nodeEnv: env.NODE_ENV || "development",
  },
  db: {
    uri: env.MONGO_URI,
  },
  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    accessExpires: env.JWT_ACCESS_EXPIRES,
    refreshSecret: env.JWT_REFRESH_SECRET,
    refreshExpires: env.JWT_REFRESH_EXPIRES,
  },
};

module.exports = config;