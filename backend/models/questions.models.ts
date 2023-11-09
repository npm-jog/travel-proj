import Question from "../../Database/models/question";
import Comment from "../../Database/models/comment";
import { Types, Document } from "mongoose";

async function fetchQuestions(country: string | undefined) {
  try {
    if (!country) {
      const questions = await Question.find({});
      return questions;
    } else {
      const questions = await Question.find({ country: country });
      return questions;
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

async function updateQuestionById(question_id: Types.ObjectId, question: Document) {
  try {
    const options = {
      new: true,
    };
    const updatedQuestion = await Question.findByIdAndUpdate(question_id, question, options);
    return updatedQuestion;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function removeQuestionById(question_id: Types.ObjectId) {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(question_id);

    return deletedQuestion;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function insertQuestion(question: Document) {
  try {
    const newQuestion = await Question.create(question);
    return newQuestion;
  } catch (err) {
    return Promise.reject(err);
  }
}
async function fetchCommentsByQuestionId(question_id: Types.ObjectId) {
  try {
    const comments = await Comment.find({ question_id: question_id });
    return comments;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function insertCommentByQuestionId(question_id: Types.ObjectId, comment: Document) {
  try {
    const newComment = await Comment.create(comment);
    return newComment;
  } catch (err) {
    return Promise.reject(err);
  }
}

export { fetchQuestions, updateQuestionById, removeQuestionById, insertQuestion, fetchCommentsByQuestionId, insertCommentByQuestionId };
