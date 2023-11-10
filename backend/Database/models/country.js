const mongoose = require("mongoose");

const { Schema } = mongoose;

const countrySchema = new Schema({
  name: { type: String, required: true },
});

const Country = mongoose.model("country", countrySchema);

module.exports = Country;
