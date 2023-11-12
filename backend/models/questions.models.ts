import Question, { QuestionDocument } from "../Database/models/question";
import Comment, { CommentDocument } from "../Database/models/comment";
import {QuestionType, CommentType} from '../interfaces/response.interfaces';
import { Types } from "mongoose";

async function fetchQuestions(country: string | undefined) {
  try {
    if (!country) {
      const questions: QuestionType[] = await Question.find({});
      return questions;
    } else {
      const questions: QuestionType[] = await Question.find({ country: country });
      return questions;
    }
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Bad request: model validation failed" });
  }
}

async function updateQuestionById(question_id: Types.ObjectId, question: QuestionDocument) {
  try {
    const options = {
      new: true,
    };
    const updatedQuestion: QuestionType | null = await Question.findByIdAndUpdate(question_id, question, options);
    if (updatedQuestion === null) return Promise.reject({ status: 404, msg: "Id does not exist" });
    return updatedQuestion;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

async function removeQuestionById(question_id: Types.ObjectId) {
  try {
    const deletedQuestion: QuestionType | null = await Question.findByIdAndDelete(question_id);
    return deletedQuestion;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

async function insertQuestion(question: QuestionDocument) {
  try {
    const newQuestion: QuestionType | any = await Question.create(question);
    return newQuestion;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Bad request: model validation failed" });
  }
}
async function fetchCommentsByQuestionId(question_id: Types.ObjectId) {
  try {
    const comments: CommentType[] = await Comment.find({ question_id: question_id });
    return comments;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

async function insertCommentByQuestionId(comment: CommentDocument) {
  try {
    const newComment: CommentType | any = await Comment.create(comment);
    return newComment;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

export { fetchQuestions, updateQuestionById, removeQuestionById, insertQuestion, fetchCommentsByQuestionId, insertCommentByQuestionId };
