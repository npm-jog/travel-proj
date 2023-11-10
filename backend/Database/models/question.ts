import mongoose, { Document } from "mongoose";

interface UserInteraction {
  username: string;
  vote: number;
  reported: boolean;
}

export interface QuestionDocument extends Document {
  username: string;
  title: string;
  body: string;
  likes?: number;
  topic: string;
  country: string;
  created_at?: Date;
  reported_count?: number;
  user_interactions?: UserInteraction[];
}

const questionSchema = new mongoose.Schema<QuestionDocument>(
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

const Question = mongoose.model<QuestionDocument>("question", questionSchema);

export default Question;
