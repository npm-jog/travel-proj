import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import {
  fetchCommentsByQuestionId,
  fetchQuestions,
  insertCommentByQuestionId,
  insertQuestion,
  removeQuestionById,
  updateQuestionById,
} from "../models/questions.models";
import {QuestionType, CommentType} from '../interfaces/response.interfaces';
import Question from "../Database/models/question";
import Comment from "../Database/models/comment";

function getQuestions(req: Request, res: Response, next: NextFunction) {
  const country: string | undefined = req.query.country as string | undefined;
  fetchQuestions(country)
    .then((questions: QuestionType[]) => {
      res.status(200).send({ questions });
    })
    .catch((err: Error) => {
      next(err);
    });
}

function postQuestion(req: Request, res: Response, next: NextFunction) {
  const newQuestion = new Question(req.body);
  insertQuestion(newQuestion)
    .then((question: QuestionType) => {
      res.status(201).send({ question });
    })
    .catch((err: Error) => {
      next(err);
    });
}

function deleteQuestion(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.question_id)) {
    next({ status: 400, msg: "Invalid Id" });
  }
  const question_id: Types.ObjectId = new Types.ObjectId(req.params.question_id);
  removeQuestionById(question_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err: Error) => {
      next(err);
    });
}

function patchQuestion(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.question_id)) {
    next({ status: 400, msg: "Invalid Id" });
  }
  const question_id: Types.ObjectId = new Types.ObjectId(req.params.question_id);
  const updatedQuestion = new Question(req.body);
  updatedQuestion._id = question_id;
  const validationErrors = updatedQuestion.validateSync();
  if (validationErrors) {
    next({ status: 400, msg: validationErrors.message });
  }

  updateQuestionById(question_id, updatedQuestion)
    .then((question: QuestionType) => {
      res.status(200).send({ question });
    })
    .catch((err: Error) => {
      next(err);
    });
}

function getCommentsByQuestionId(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.question_id)) {
    next({ status: 400, msg: "Invalid Id" });
  }
  const question_id: Types.ObjectId = new Types.ObjectId(req.params.question_id);
  fetchCommentsByQuestionId(question_id)
    .then((comments: CommentType[]) => {
      res.status(200).send({ comments });
    })
    .catch((err: Error) => {
      next(err);
    });
}

function postCommentsByQuestionId(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.question_id)) {
    next({ status: 400, msg: "Invalid Id" });
  }

  const newComment = new Comment(req.body);
  insertCommentByQuestionId(newComment)
    .then((comment: CommentType) => {
      res.status(200).send({ comment });
    })
    .catch((err: Error) => {
      next(err);
    });
}

export { getQuestions, postQuestion, deleteQuestion, patchQuestion, getCommentsByQuestionId, postCommentsByQuestionId };
