const mongoose = require("mongoose");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

async function connectDB() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not set");
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB connected successfully to ${ENV} DB`);
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

module.exports = connectDB;
