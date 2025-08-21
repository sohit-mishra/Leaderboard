const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    totalpoints: {
      type: Number,
      default: 0,
    },
    avatarUrl: {
      type: String,
      default: "https://images.unsplash.com/photo-1674049405160-9b800f5645f5",
    },
    resetToken: {
      type: String,
    },
    resetTokenExp: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;