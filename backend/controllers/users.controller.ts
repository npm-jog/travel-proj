import {Request, Response, NextFunction} from 'express';
import {fetchUserById} from '../models/users.models';

function getUserById(req: Request, res: Response, next: NextFunction) {
  fetchUserById().then(x => {
    res.status(200).send()
  })
  .catch((err: Error) => {
    next(err);
  })
}

function postUser(req: Request, res: Response, next: NextFunction) {
  res.status(201).send();
}

function deleteUserById(req: Request, res: Response, next: NextFunction) {
  res.status(204).send();
}

function patchUserById(req: Request, res: Response, next: NextFunction) {
res.status(200).send();
}

  export { getUserById, postUser, deleteUserById, patchUserById };