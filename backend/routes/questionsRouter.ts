import express, { Request, Response } from "express";
import {
  deleteQuestion,
  getQuestions,
  patchQuestion,
  postQuestion,
  getCommentsByQuestionId,
  postCommentsByQuestionId,
} from "../controllers/questions.controllers";

const questionsRouter = express.Router();

questionsRouter.get("/", getQuestions);
questionsRouter.get("/:question_id/comments", getCommentsByQuestionId);
questionsRouter.post("/", postQuestion);
questionsRouter.post("/:question_id/comments", postCommentsByQuestionId);
questionsRouter.delete("/:question_id", deleteQuestion);
questionsRouter.patch("/:question_id", patchQuestion);

export default questionsRouter;
