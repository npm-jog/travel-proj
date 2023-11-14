import express from "express";
import {
  deleteQuestion,
  getQuestions,
  patchQuestion,
  postQuestion,
  getCommentsByQuestionId,
  postCommentsByQuestionId,
} from "../controllers/questions.controllers";

const questionsRouter = express.Router();

questionsRouter.route("/").get(getQuestions).post(postQuestion);
questionsRouter.route("/:question_id/comments").get(getCommentsByQuestionId).post(postCommentsByQuestionId);
questionsRouter.route("/:question_id").delete(deleteQuestion).patch(patchQuestion);

export default questionsRouter;
