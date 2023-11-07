"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//model import
const User = require("../../models/user.js");
const Review = require("../../models/review.js");
const Question = require("../../models/question.js");
const Country = require("../../models/country.js");
const Comment = require("../../models/comment.js");
const seedDatabase = ({ commentData, questionData, reviewData, userData, countryData }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //delete DB
        yield User.deleteMany({});
        yield Review.deleteMany({});
        yield Country.deleteMany({});
        yield Question.deleteMany({});
        yield Comment.deleteMany({});
        //seed with data
        yield User.create(userData);
        yield Review.create(reviewData);
        yield Question.create(questionData);
        yield Country.create(countryData);
        //setting up comments to questions
        //just for test purpose need to add condition
        const title = ["I hear the food is great. Is this true?", "How long should I stay?", "Nightlife?"];
        const questionId = [];
        for (let i = 0; i < title.length; i++) {
            const question = yield Question.findOne({ title: title[i] });
            questionId.push(question._id);
        }
        commentData[0].question_id = questionId[0];
        commentData[1].question_id = questionId[0];
        commentData[2].question_id = questionId[1];
        commentData[3].question_id = questionId[2];
        commentData[4].question_id = questionId[2];
        commentData[5].question_id = questionId[2];
        yield Comment.create(commentData);
    }
    catch (err) {
        console.error(err);
    }
});
module.exports = seedDatabase;
