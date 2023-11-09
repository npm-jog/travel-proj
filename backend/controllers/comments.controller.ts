import { Request, Response, NextFunction } from "express";
import { Types, Document } from "mongoose";
import { removeCommentById, updateCommentById } from "../models/comments.models";

function deleteComment(req: Request, res: Response, next: NextFunction) {
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
  const comment_id: Types.ObjectId = new Types.ObjectId(req.params.comment_id);
  const updatedComment: Document = req.body;
  updateCommentById(comment_id, updatedComment)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err: Error) => {
      next(err);
    });
}

export { patchComment, deleteComment };
