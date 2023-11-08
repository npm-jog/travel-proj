import express, { Request, Response } from "express";
import { deleteComment, patchComment } from "../controllers/comments.controller";

const commentsRouter = express.Router();

commentsRouter.patch("/:comment_id", patchComment);
commentsRouter.delete("/:comment_id", deleteComment);

export default commentsRouter;
