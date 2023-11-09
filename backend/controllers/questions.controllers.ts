import { Request, Response, NextFunction } from "express";
import { Types, Document } from "mongoose";
import {
  fetchCommentsByQuestionId,
  fetchQuestions,
  insertCommentByQuestionId,
  insertQuestion,
  removeQuestionById,
  updateQuestionById,
} from "../models/questions.models";

function getQuestions(req: Request, res: Response, next: NextFunction) {
  const country: string | undefined = req.query.country as string | undefined;
  fetchQuestions(country)
    .then((questions) => {
      res.status(200).send({ questions });
    })
    .catch((err: Error) => {
      next(err);
    });
}

function postQuestion(req: Request, res: Response, next: NextFunction) {
  const newQuestion: Document = req.body;
  insertQuestion(newQuestion)
    .then((question) => {
      res.status(201).send({ question });
    })
    .catch((err: Error) => {
      next(err);
    });
}

function deleteQuestion(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.question_id)) {
    next({ status: 404, msg: "invalid Id" });
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
    next({ status: 404, msg: "invalid Id" });
  }
  const question_id: Types.ObjectId = new Types.ObjectId(req.params.question_id);
  const updatedQuestion: Document = req.body;
  updateQuestionById(question_id, updatedQuestion)
    .then((question) => {
      res.status(200).send({ question });
    })
    .catch((err: Error) => {
      next(err);
    });
}

function getCommentsByQuestionId(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.question_id)) {
    next({ status: 404, msg: "invalid Id" });
  }
  const question_id: Types.ObjectId = new Types.ObjectId(req.params.question_id);
  fetchCommentsByQuestionId(question_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err: Error) => {
      next(err);
    });
}

function postCommentsByQuestionId(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.question_id)) {
    next({ status: 404, msg: "invalid Id" });
  }
  const question_id: Types.ObjectId = new Types.ObjectId(req.params.question_id);
  const newComment: Document = req.body;
  insertCommentByQuestionId(question_id, newComment)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err: Error) => {
      next(err);
    });
}

export { getQuestions, postQuestion, deleteQuestion, patchQuestion, getCommentsByQuestionId, postCommentsByQuestionId };
