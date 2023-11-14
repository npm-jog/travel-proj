import mongoose, { Document } from "mongoose";

interface Ratings {
  safety: number;
  food: number;
  activities: number;
  cost: number;
  scenery: number;
}

export interface ReviewDocument extends Document {
  username: string;
  body: string;
  ratings: Ratings;
  pictures?: string[];
  country: string;
  reported_count?: number;
  user_interactions?: { username: string; reported: boolean }[];
}

const reviewSchema = new mongoose.Schema<ReviewDocument>(
  {
    username: { type: String, required: true },
    body: { type: String, required: true },
    ratings: {
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

const Review = mongoose.model<ReviewDocument>("review", reviewSchema);

export default Review;
