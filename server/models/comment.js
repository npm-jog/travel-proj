const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    username: { type: String, required: true },
    body: { type: String, required: true },
    likes: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    reported_count: { type: Number, default: 0 },
    user_interactions: [{ username: String, vote: Number, reported: Boolean }],
  },
  { minimize: false }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
