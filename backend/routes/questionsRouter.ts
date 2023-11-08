import express, { Request, Response } from "express";
import { deleteQuestion, getQuestions, patchQuestion, postQuestion } from "../controllers/questions.controllers";

const questionsRouter = express.Router();

questionsRouter.get("/", getQuestions);
questionsRouter.post("/", postQuestion);
questionsRouter.delete("/:question_id", deleteQuestion);
questionsRouter.patch("/:question_id", patchQuestion);

export default questionsRouter;
