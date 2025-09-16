/**
 * @file server.js
 * @description Main server entry point.
 */

const app = require("./app");

const config = require("./config/config");
const connectDB = require("./config/db");

const logger = require('./utils/logger');

// Connect to DB
connectDB();

// Start server
app.listen(config.server.port, () => {
  logger.info(`🚀 Server running in ${config.server.nodeEnv} mode on port ${config.server.port}`);
});