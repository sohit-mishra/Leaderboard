require("dotenv").config();

const env = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/W3BusinessPvtLtd",
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  FRONTED_URL: process.env.FRONTED_URL || "http://localhost:5173",
  NODE_ENV: process.env.NODE_ENV
};

module.exports = env;
