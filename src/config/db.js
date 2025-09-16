/**
 * @file db.js
 * @description Database connection handler using Mongoose.
 */

const mongoose = require("mongoose");
const config = require("./config");

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
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;