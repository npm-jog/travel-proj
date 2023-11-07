import { Request, Response, NextFunction } from "express";
import {
  fetchUserById,
  createUser,
  removeUserById,
  updateUserById,
} from "../models/users.models";

function getUserById(req: Request, res: Response, next: NextFunction) {
  fetchUserById()
    .then((x) => {
      res.status(200).send();
    })
    .catch((err: Error) => {
      next(err);
    });
}

function postUser(req: Request, res: Response, next: NextFunction) {
  // createUser().then(x => {
  //   res.status(201).send()
  // })
  // .catch((err: Error) => {
  //   next(err)
  // })
}

function deleteUserById(req: Request, res: Response, next: NextFunction) {
  // removeUserById().then(x => {
  //   res.status(204).send()
  // })
  // .catch((err: Error) => {
  //   next(err)
  // })
}

function patchUserById(req: Request, res: Response, next: NextFunction) {
  // updateUserById().then(x => {
  //   res.status(200).send()
  // })
  // .catch((err: Error) => {
  //   next(err)
  // })
}

export { getUserById, postUser, deleteUserById, patchUserById };
