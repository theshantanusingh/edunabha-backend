/**
 * @file db.js
 * @description Handles MongoDB connection using Mongoose with logging, retries, and graceful shutdown.
 */

const mongoose = require("mongoose");
const logger = require("../utils/logger");
const config = require("./config");

/**
 * Connects to MongoDB using the connection URI from environment variables.
 * Includes retry logic and logging.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await mongoose.connect(config.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error.message}`);
    logger.info("Retrying in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  logger.info("MongoDB connection closed due to app termination");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  logger.info("MongoDB connection closed due to SIGTERM");
  process.exit(0);
});

module.exports = connectDB;