const mongoose = require("mongoose");
const path = require("path");

const ENV = process.env.NODE_ENV;
const projectRootDir = path.resolve(__dirname, "..");

require("dotenv").config({
  path: `${projectRootDir}/../.env.${ENV}`,
});

async function resetDatabase() {
  try {
    // Connect to the database using the current environment's DB_URL
    await mongoose.connect(process.env.DATABASE_URL);

    // Drop the database
    console.log("Dropping database for environment: ", ENV);
    await mongoose.connection.db.dropDatabase();

    await mongoose.disconnect();

    console.log("Database reset complete for environment: ", ENV);
  } catch (err) {
    console.error(err);
  }
}

resetDatabase();
