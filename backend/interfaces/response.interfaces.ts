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
  _id: string;
  question_id: string;
  username: string;
  body: string;
  likes: number;
  created_at: string;
  reported_count: number;
  user_interactions: UserInteraction[];
  __v: number;
}

export interface CountryType {
  _id: string;
  name: string;
  __v: number;
}

export interface QuestionType {
  _id: string,
  username: string,
  title: string,
  body: string,
  likes: number,
  topic: string,
  country: string,
  created_at: string,
  reported_count: number,
  user_interactions: UserInteraction[],
  __v: number,
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
  _id: string;
  username: string;
  body: string;
  pictures: string[];
  country: string;
  reported_count: number;
  user_interactions: UserInteraction[];
  __v: number;
}

export interface UserType{
  _id: string;
  forename: string;
  surname: string;
  username: string;
  avatar_url: string;
  visited_locations: string[];
  wishlist: string[];
  albums: any,
  __v: number
}