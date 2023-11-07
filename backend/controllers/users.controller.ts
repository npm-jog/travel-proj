import { Request, Response, NextFunction } from "express";
import { fetchUserById, insertUser, removeUserById, updateUserById } from "../models/users.models";
import { Types, Document } from "mongoose";

function getUserById(req: Request, res: Response, next: NextFunction) {
  const id: Types.ObjectId = new Types.ObjectId(req.params.user_id);
  fetchUserById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err: Error) => {
      next(err);
    });
}

function postUser(req: Request, res: Response, next: NextFunction) {
  const newUser: Document = req.body;
  insertUser(newUser)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err: Error) => {
      next(err);
    });
}

function deleteUserById(req: Request, res: Response, next: NextFunction) {
  const id: Types.ObjectId = new Types.ObjectId(req.params.user_id);
  removeUserById(id)
    .then((user) => {
      res.status(204).send(user);
    })
    .catch((err: Error) => {
      next(err);
    });
}

function patchUserById(req: Request, res: Response, next: NextFunction) {
  const id: Types.ObjectId = new Types.ObjectId(req.params.user_id);
  const updatedUser: Document = req.body;
  updateUserById(id, updatedUser)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err: Error) => {
      next(err);
    });
}

export { getUserById, postUser, deleteUserById, patchUserById };
