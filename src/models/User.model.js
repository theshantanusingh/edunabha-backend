/**
 * @file User.model.js
 * @description Mongoose model for application users (students, teachers, admins).
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * User Schema
 * Defines the structure of User documents in MongoDB.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save middleware to hash password before saving.
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Compare entered password with hashed password.
 * @param {string} candidatePassword - Plain text password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);