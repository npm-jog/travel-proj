const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    username: { type: String, required: true },
    body: { type: String, required: true },
    rate: {
      safety: { type: Number, required: true },
      food: { type: Number, required: true },
      activities: { type: Number, required: true },
      cost: { type: Number, required: true },
      scenery: { type: Number, required: true },
    },
    pictures: [String],
    country: { type: String, required: true },
    reported_count: { type: Number, default: 0 },
    user_interactions: [{ username: String, reported: { type: Boolean, default: false } }],
  },
  { minimize: false }
);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
