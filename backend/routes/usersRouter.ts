import express, { Request, Response } from "express";
import { getUserById, postUser, deleteUserById, patchUserById } from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.route("/").post(postUser);
usersRouter.route("/:user_id").get(getUserById).delete(deleteUserById).patch(patchUserById);

export default usersRouter;
