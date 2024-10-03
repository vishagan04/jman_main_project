// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // Get the URI from environment variables
    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env file");
    }
    await mongoose.connect(uri); // Removed deprecated options
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
