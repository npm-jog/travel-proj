import express, { Request, Response } from "express";
import { deleteComment, patchComment } from "../controllers/comments.controller";

const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").patch(patchComment).delete(deleteComment);

export default commentsRouter;
