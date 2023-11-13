import { Types } from "mongoose";

export interface RequestError {
  status: number;
  msg: string;
}

interface UserInteraction {
  username: string;
  vote: number;
  reported: boolean;
}

export interface CommentType {
  _id: Types.ObjectId;
  question_id: Types.ObjectId;
  username: string;
  body: string;
  likes: number;
  created_at: string;
  reported_count: number;
  user_interactions: UserInteraction[];
  __v: number;
}

export interface CountryType {
  _id: Types.ObjectId;
  name: string;
  __v: number;
}

export interface QuestionType {
  _id: Types.ObjectId;
  username: string;
  title: string;
  body: string;
  likes: number;
  topic: string;
  country: string;
  created_at: string;
  reported_count: number;
  user_interactions: UserInteraction[];
  __v: number;
}

interface Ratings {
  safety: number;
  food: number;
  activities: number;
  cost: number;
  scenery: number;
}

export interface ReviewType {
  ratings: Ratings;
  _id: Types.ObjectId;
  username: string;
  body: string;
  pictures: string[];
  country: string;
  reported_count: number;
  user_interactions: UserInteraction[];
  __v: number;
}

export interface UserType {
  _id: Types.ObjectId;
  forename: string;
  surname: string;
  username: string;
  email: string;
  avatar_url: string;
  visited_locations: string[];
  wishlist: string[];
  albums: any;
  __v: number;
}
