const seedDatabase = require("./seed.js");
const connectDB = require("../connection.js");
const devData = require("../data/dev-data/index.js");

const mongoose = require("mongoose");

const runSeed = async () => {
  try {
    // Establish database connection
    await connectDB();

    //seed the database
    await seedDatabase(devData);

    // Close database connection
    await mongoose.disconnect();
    console.log("MongoDB disconnected successfully");
  } catch (err) {
    console.error("Error running seed:", err);
  }
};

runSeed();
