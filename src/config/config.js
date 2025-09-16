/**
 * @file config.js
 * @description Centralized configuration object for environment variables.
 */

require("dotenv").config();

/**
 * Application configuration loaded from environment variables.
 * @typedef {Object} AppConfig
 * @property {Object} server - Server-related configuration
 * @property {number} server.port - Port the app will run on
 * @property {string} server.env - Current environment (development, production, test)
 *
 * @property {Object} db - Database-related configuration
 * @property {string} db.uri - MongoDB connection URI
 *
 * @property {Object} jwt - JSON Web Token configuration
 * @property {string} jwt.accessSecret - Secret key for access tokens
 * @property {string} jwt.accessExpires - Expiry for access tokens (e.g., 15m)
 * @property {string} jwt.refreshSecret - Secret key for refresh tokens
 * @property {string} jwt.refreshExpires - Expiry for refresh tokens (e.g., 7d)
 */
const config = {
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development",
  },
  db: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpires: process.env.JWT_ACCESS_EXPIRES || "15m",
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpires: process.env.JWT_REFRESH_EXPIRES || "7d",
  },
};

module.exports = config;