import Question from "../../Database/models/question";
import { Types, Document } from "mongoose";

async function fetchQuestions(country: String | undefined) {
  try {
    if (!country) {
      const questions = await Question.find({});
      return questions;
    } else {
      const questions = await Question.find({ country: country });
      return questions;
    }
  } catch (err) {
    return err;
  }
}

async function updateQuestionById(id: Types.ObjectId, question: Document) {
  try {
    const options = {
      new: true,
    };
    const updatedQuestion = await Question.findByIdAndUpdate(id, question, options);
    return updatedQuestion;
  } catch (err) {
    return err;
  }
}

async function removeQuestionById(question_id: Types.ObjectId) {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(question_id);

    return deletedQuestion;
  } catch (err) {
    return err;
  }
}

async function insertQuestion(question: Document) {
  try {
    const newQuestion = await Question.create(question);
    return newQuestion;
  } catch (err) {
    return err;
  }
}

export { fetchQuestions, updateQuestionById, removeQuestionById, insertQuestion };
