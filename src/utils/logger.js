/**
 * @file logger.js
 * @description Centralized Winston logger for application-wide logging.
 */

const { createLogger, format, transports } = require("winston");

const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// Create logger instance
const logger = createLogger({
  level: "info", // default log level
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    // Print logs in console with colors
    new transports.Console({
      format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), logFormat),
    }),
    // Save error logs to file
    new transports.File({ filename: "logs/error.log", level: "error" }),
    // Save all logs to file
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

module.exports = logger;