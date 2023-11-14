import { Request, Response, NextFunction } from "express";
import { removeCommentById, updateCommentById } from "../models/comments.models";
import { CommentType } from '../interfaces/response.interfaces';
import { Types } from "mongoose";
import Comment from "../Database/models/comment";

function deleteComment(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.comment_id)) {
    next({ status: 404, msg: "invalid Id" });
  }
  const comment_id: Types.ObjectId = new Types.ObjectId(req.params.comment_id);
  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err: Error) => {
      next(err);
    });
}

function patchComment(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.comment_id)) {
    next({ status: 404, msg: "invalid Id" });
  }
  const comment_id: Types.ObjectId = new Types.ObjectId(req.params.comment_id);
  const updatedComment = new Comment(req.body);
  updatedComment._id = comment_id;
  const validationErrors = updatedComment.validateSync();
  if (validationErrors) {
    next({ status: 400, msg: validationErrors.message });
  }

  updateCommentById(comment_id, updatedComment)
    .then((comment: CommentType | null) => {
      res.status(200).send({ comment });
    })
    .catch((err: Error) => {
      next(err);
    });
}

export { patchComment, deleteComment };
