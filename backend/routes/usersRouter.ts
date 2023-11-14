import express from "express";
import { getUserById, postUser, deleteUserById, patchUserById, getUserByEmail } from "../controllers/users.controller";
import { get } from "http";

const usersRouter = express.Router();

usersRouter.route("/").post(postUser).get(getUserByEmail);
usersRouter.route("/:user_id").get(getUserById).delete(deleteUserById).patch(patchUserById);

export default usersRouter;
