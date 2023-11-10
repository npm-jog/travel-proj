import { CommentDocument } from "../../models/comment";

const comment: (CommentDocument | Partial<CommentDocument>)[] = [
  {
    username: "TD2382",
    body: "no",
    likes: -3,
    reported_count: 1,
    created_at: new Date(2096464040000),
    user_interactions: [
      { username: "SunshineLoz92", vote: -1, reported: true },
      { username: "flyawaypaul", vote: -1, reported: false },
      { username: "Backpacker2001", vote: -1, reported: false },
    ],
  },
  {
    username: "SunshineLoz92",
    body: "Yes excellent! Every region has unique dishes!",
    likes: 2,
    reported_count: 0,
    created_at: new Date(2196464040000),
    user_interactions: [
      { username: "flyawaypaul", vote: 1, reported: false },
      { username: "Backpacker2001", vote: 1, reported: false },
    ],
  },
  {
    username: "TD2382",
    body: "0 days. I hate everything.",
    likes: 0,
    reported_count: 3,
    created_at: new Date(2296464040000),
    user_interactions: [
      { username: "SunshineLoz92", vote: 0, reported: true },
      { username: "flyawaypaul", vote: 0, reported: true },
      { username: "Backpacker2001", vote: 0, reported: true },
    ],
  },
  {
    username: "SunshineLoz92",
    body: "My friends tell me it is ok, but better to go to Thailand for nightlife.",
    likes: 1,
    reported_count: 0,
    created_at: new Date(2396464040000),
    user_interactions: [{ username: "FoodieShaz", vote: 1, reported: false }],
  },
  {
    username: "Backpacker2001",
    body: "Can defo have a good time in the big cities.",
    likes: 0,
    reported_count: 0,
    created_at: new Date(2496464040000),
    user_interactions: [],
  },
  {
    username: "flyawaypaul",
    body: "Looks great from the videos I've seen!",
    likes: 0,
    reported_count: 0,
    created_at: new Date(2496464040000),
    user_interactions: [],
  },
];

export = comment;
