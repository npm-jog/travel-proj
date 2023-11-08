import express, { Request, Response } from "express";
import { getUserById, postUser, deleteUserById, patchUserById } from "../controllers/users.controller";


const usersRouter = express.Router();

usersRouter.get("/:user_id", getUserById);
usersRouter.post("/", postUser);
usersRouter.delete("/:user_id", deleteUserById);
usersRouter.patch("/:user_id", patchUserById);

export default usersRouter;
