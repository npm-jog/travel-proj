import User, { UserDocument } from "../models/user";
import Review, { ReviewDocument } from "../models/review";
import Question, { QuestionDocument } from "../models/question";
import Country, { CountryDocument } from "../models/country";
import Comment, { CommentDocument } from "../models/comment";
import { Schema } from "mongoose";

interface SeedDatabaseArgs {
  commentData: CommentDocument[];
  questionData: QuestionDocument[];
  reviewData: ReviewDocument[];
  userData: UserDocument[];
  countryData: CountryDocument[];
}

async function seedDatabase({ commentData, questionData, reviewData, userData, countryData }: SeedDatabaseArgs) {
  try {
    // delete DB
    await User.deleteMany({});
    await Review.deleteMany({});
    await Country.deleteMany({});
    await Question.deleteMany({});
    await Comment.deleteMany({});

    // seed with data
    await User.create(userData);
    await Review.create(reviewData);
    await Question.create(questionData);
    await Country.create(countryData);

    const title = ["I hear the food is great. Is this true?", "How long should I stay?", "Nightlife?"];
    const questionId: Schema.Types.ObjectId[] = [];
    for (let i = 0; i < title.length; i++) {
      const question = await Question.findOne({ title: title[i] });
      if (question) {
        questionId.push(question._id);
      }
    }
    commentData[0].question_id = questionId[0];
    commentData[1].question_id = questionId[0];
    commentData[2].question_id = questionId[1];
    commentData[3].question_id = questionId[2];
    commentData[4].question_id = questionId[2];
    commentData[5].question_id = questionId[2];
    await Comment.create(commentData);
  } catch (err) {
    console.error(err);
  }
}

export default seedDatabase;
