import { Request, Response, NextFunction } from "express";
import { UserType } from "../interfaces/response.interfaces";
import { fetchUserById, fetchUserByEmail, insertUser, removeUserById, updateUserById } from "../models/users.models";
import { Types } from "mongoose";
import User from "../Database/models/user";

function getUserById(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.user_id)) {
    next({ status: 404, msg: "invalid Id" });
  }
  const user_id: Types.ObjectId = new Types.ObjectId(req.params.user_id);

  fetchUserById(user_id)
    .then((user: UserType | null) => {
      res.status(200).send({ user });
    })
    .catch((err: Error) => {
      next(err);
    });
}

function getUserByEmail(req: Request, res: Response, next: NextFunction) {
  const email: string | null = req.query.email as string;

  fetchUserByEmail(email)
    .then((user: UserType | null) => {
      res.status(200).send({ user });
    })
    .catch((err: Error) => {
      next(err);
    });
}

function postUser(req: Request, res: Response, next: NextFunction) {
  const newUser = new User(req.body);
  insertUser(newUser)
    .then((user: UserType) => {
      res.status(201).send({ user });
    })
    .catch((err: Error) => {
      next(err);
    });
}

function deleteUserById(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.user_id)) {
    next({ status: 404, msg: "invalid Id" });
  }
  const user_id: Types.ObjectId = new Types.ObjectId(req.params.user_id);
  removeUserById(user_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err: Error) => {
      next(err);
    });
}

function patchUserById(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.user_id)) {
    next({ status: 404, msg: "invalid Id" });
  }
  const user_id: Types.ObjectId = new Types.ObjectId(req.params.user_id);
  const updatedUser = new User(req.body);

  updatedUser._id = user_id;
  const validationErrors = updatedUser.validateSync();
  if (validationErrors) {
    next({ status: 400, msg: validationErrors.message });
  }

  updateUserById(user_id, updatedUser)
    .then((user: UserType | null) => {
      res.status(200).send({ user });
    })
    .catch((err: Error) => {
      next(err);
    });
}

export { getUserById, getUserByEmail, postUser, deleteUserById, patchUserById };
