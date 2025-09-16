/**
 * @file db.js
 * @description Database connection handler using Mongoose.
 */

const mongoose = require("mongoose");
const config = require("./config");
const logger = require('./../utils/logger');

/**
 * Connects to MongoDB database.
 * Logs success or failure messages.
 * @returns {Promise<void>}
 */

async function connectDB() {
  try {
    await mongoose.connect(config.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;