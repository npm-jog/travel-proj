import mongoose from "mongoose";

const ENV: string = process.env.NODE_ENV || "development";
const cwd: string = process.cwd();

require("dotenv").config({
  path: `${cwd}/.env.${ENV}`,
});

async function connectDB() {
  if (!process.env.DATABASE_URL) {
    throw new Error(`DATABASE_URL not set ${ENV}`);
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB connected successfully to ${ENV} DB`);
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

export default connectDB;
