import { QuestionDocument } from "../../models/question";

const questions: (QuestionDocument | Partial<QuestionDocument>)[] = [
  {
    username: "flyawaypaul",
    title: "How expensive is a holiday here?",
    body: "I don't want to spend more than $2000 for my week long holiday. Do you think this is viable and any tips to keep within my budget?",
    likes: 0,
    topic: "budget",
    country: "Italy",
    created_at: new Date(1602828180000),
    reported_count: 1,
    user_interactions: [
      { username: "SunshineLoz92", vote: -1, reported: true },
      { username: "Backpacker2001", vote: 1, reported: false },
    ],
  },
  {
    username: "FoodieShaz",
    title: "I hear the food is great. Is this true?",
    body: "Read the title",
    likes: 2,
    topic: "food",
    country: "Italy",
    created_at: new Date(1596464040000),
    reported_count: 0,
    user_interactions: [
      { username: "SunshineLoz92", vote: 1, reported: false },
      { username: "flyawaypaul", vote: 1, reported: false },
    ],
  },
  {
    username: "TD2382",
    title: "Italy or Portugal?",
    body: "Which is better for beaches? Italy or Portugal?",
    likes: -2,
    topic: "general",
    country: "Italy",
    created_at: new Date(1496464040000),
    reported_count: 2,
    user_interactions: [
      { username: "SunshineLoz92", vote: -1, reported: true },
      { username: "flyawaypaul", vote: -1, reported: true },
    ],
  },
  {
    username: "SunshineLoz92",
    title: "Does Vietnam have good beaches?",
    body: "Are there lots of good beaches here? When is the best time of year to get the most sun?",
    likes: 2,
    topic: "beaches",
    country: "Vietnam",
    created_at: new Date(1396464040000),
  },
  {
    username: "FoodieShaz",
    title: "Nightlife?",
    body: "Does this country have a lot of nightlife attractions?",
    likes: -1,
    topic: "activities",
    country: "Vietnam",
    created_at: new Date(1296464040000),
  },
  {
    username: "SunshineLoz92",
    title: "How long should I stay?",
    body: "How long do you recommend staying? Is there enough to do for a 2 week visit?",
    likes: -1,
    topic: "activities",
    country: "Greece",
    created_at: new Date(1596464040000),
  },
];

export = questions;
