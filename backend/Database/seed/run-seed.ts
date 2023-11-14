import seedDatabase from "./seed";
import connectDB from "../connection";
import devData from "../data/dev-data";

import mongoose from "mongoose";

async function runSeed() {
  try {
    // Establish database connection
    await connectDB();

    // Seed the database
    await seedDatabase(devData);

    // Close database connection
    await mongoose.disconnect();
    console.log("MongoDB disconnected successfully");
  } catch (err) {
    console.error("Error running seed:", err);
  }
}

runSeed();
