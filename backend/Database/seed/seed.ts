import User, { UserDocument } from "../models/user";
import Review, { ReviewDocument } from "../models/review";
import Question, { QuestionDocument } from "../models/question";
import Country, { CountryDocument } from "../models/country";
import Comment, { CommentDocument } from "../models/comment";
import axios from "axios";
import { Types } from "mongoose";
import { CountryType } from "../../interfaces/response.interfaces";

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

    if (process.env.ENVIRONMENT === "test") {
      await Country.create(countryData);
    } else {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countriesData = response.data;

      const countriesArray: any = [];
      let lat;
      let lng;
      countriesData.forEach((country: any) => {
        const name = country.name.common;
        if (country.capitalInfo.latlng) {
          lat = country.capitalInfo.latlng[0];
          lng = country.capitalInfo.latlng[1];
        } else {
          lat = country.latlng[0];
          lng = country.latlng[1];
        }

        countriesArray.push({ name: name, coordinates: { lat: lat, lng: lng } });
      });
      Country.create(countriesArray);
    }

    const title = ["I hear the food is great. Is this true?", "How long should I stay?", "Nightlife?"];
    const questionId: Types.ObjectId[] = [];
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
