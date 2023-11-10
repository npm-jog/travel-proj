//model import
const User = require("../models/user.js");
const Review = require("../models/review.js");
const Question = require("../models/question.js");
const Country = require("../models/country.js");
const Comment = require("../models/comment.js");

const seedDatabase = async ({ commentData, questionData, reviewData, userData, countryData }) => {
  try {
    //delete DB
    await User.deleteMany({});
    await Review.deleteMany({});
    await Country.deleteMany({});
    await Question.deleteMany({});
    await Comment.deleteMany({});

    //seed with data
    await User.create(userData);
    await Review.create(reviewData);
    await Question.create(questionData);
    await Country.create(countryData);

    //setting up comments to questions
    //just for test purpose need to add condition

    const title = ["I hear the food is great. Is this true?", "How long should I stay?", "Nightlife?"];
    const questionId = [];

    for (let i = 0; i < title.length; i++) {
      const question = await Question.findOne({ title: title[i] });
      questionId.push(question._id);
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
};

module.exports = seedDatabase;
