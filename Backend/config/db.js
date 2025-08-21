const mongoose = require("mongoose");
const env = require("../config/env");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("Database is Connect Successfully");
  } catch (error) {
    console.log("MongoDB is not connect", error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;