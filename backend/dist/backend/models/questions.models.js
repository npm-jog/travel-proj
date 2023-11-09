"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCommentByQuestionId = exports.fetchCommentsByQuestionId = exports.insertQuestion = exports.removeQuestionById = exports.updateQuestionById = exports.fetchQuestions = void 0;
const question_1 = __importDefault(require("../../Database/models/question"));
const comment_1 = __importDefault(require("../../Database/models/comment"));
async function fetchQuestions(country) {
    try {
        if (!country) {
            const questions = await question_1.default.find({});
            return questions;
        }
        else {
            const questions = await question_1.default.find({ country: country });
            return questions;
        }
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Bad request: model validation failed" });
    }
}
exports.fetchQuestions = fetchQuestions;
async function updateQuestionById(question_id, question) {
    try {
        const options = {
            new: true,
        };
        const updatedQuestion = await question_1.default.findByIdAndUpdate(question_id, question, options);
        return updatedQuestion;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Id does not exist" });
    }
}
exports.updateQuestionById = updateQuestionById;
async function removeQuestionById(question_id) {
    try {
        const deletedQuestion = await question_1.default.findByIdAndDelete(question_id);
        return deletedQuestion;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Id does not exist" });
    }
}
exports.removeQuestionById = removeQuestionById;
async function insertQuestion(question) {
    try {
        const newQuestion = await question_1.default.create(question);
        return newQuestion;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Bad request: model validation failed" });
    }
}
exports.insertQuestion = insertQuestion;
async function fetchCommentsByQuestionId(question_id) {
    try {
        const comments = await comment_1.default.find({ question_id: question_id });
        return comments;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Id does not exist" });
    }
}
exports.fetchCommentsByQuestionId = fetchCommentsByQuestionId;
async function insertCommentByQuestionId(question_id, comment) {
    try {
        const newComment = await comment_1.default.create(comment);
        return newComment;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Id does not exist" });
    }
}
exports.insertCommentByQuestionId = insertCommentByQuestionId;
