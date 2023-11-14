import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  forename: string;
  surname: string;
  username: string;
  email: string;
  avatar_url?: string;
  visited_locations?: string[];
  wishlist?: string[];
  albums?: { country: string; url: string }[];
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    forename: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    avatar_url: { type: String, default: "https://avatar.iran.liara.run/public" },
    visited_locations: { type: [String], default: [] },
    wishlist: { type: [String], default: [] },
    albums: { type: [{ country: String, url: String }], default: [] },
  },
  { minimize: false }
);

const User = mongoose.model<UserDocument>("user", userSchema);

export default User;
