const mongoose = require("mongoose");

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    likes: { type: Number, default: 0 },
    topic: { type: String, default: "general" },
    country: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    reported_count: { type: Number, default: 0 },
    user_interactions: [{ username: String, vote: { type: Number, default: 0 }, reported: { type: Boolean, default: false } }],
  },
  { minimize: false }
);

const Question = mongoose.model("question", questionSchema);

module.exports = Question;
