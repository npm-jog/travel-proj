import mongoose, { Document } from "mongoose";

interface UserInteraction {
  username: string;
  vote: number;
  reported: boolean;
}

export interface CommentDocument extends Document {
  question_id: mongoose.Schema.Types.ObjectId;
  username: string;
  body: string;
  likes: number;
  created_at: Date;
  reported_count: number;
  user_interactions: UserInteraction[];
}

const commentSchema = new mongoose.Schema<CommentDocument>(
  {
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: "questions", required: true },
    username: { type: String, required: true },
    body: { type: String, required: true },
    likes: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    reported_count: { type: Number, default: 0 },
    user_interactions: [{ username: String, vote: { type: Number, default: 0 }, reported: { type: Boolean, default: false } }],
  },
  { minimize: false }
);

const Comment = mongoose.model<CommentDocument>("comment", commentSchema);

export default Comment;
