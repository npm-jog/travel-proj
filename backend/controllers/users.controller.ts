import { Request, Response, NextFunction } from "express";
import { fetchUserById, insertUser, removeUserById, updateUserById } from "../models/users.models";
import { Types, Document } from "mongoose";

function getUserById(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.user_id)) {
    next({ status: 404, msg: "invalid Id" });
  }
  const user_id: Types.ObjectId = new Types.ObjectId(req.params.user_id);

  fetchUserById(user_id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err: Error) => {
      next(err);
    });
}

function postUser(req: Request, res: Response, next: NextFunction) {
  const newUser: Document = req.body;
  insertUser(newUser)
    .then((user) => {
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
  const updatedUser: Document = req.body;
  updateUserById(user_id, updatedUser)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err: Error) => {
      next(err);
    });
}

export { getUserById, postUser, deleteUserById, patchUserById };
