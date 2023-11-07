const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    forename: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    avatar_url: { type: String, default: "https://avatar.iran.liara.run/public" },
    visited_locations: [String],
    wishlist: [String],
    albums: [{ country: String, url: String }],
  },
  { minimize: false }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
