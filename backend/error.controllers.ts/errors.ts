import { Request, Response, NextFunction } from "express";
import { RequestError } from '../types/types';

function handleErrors(err: RequestError | any, req: Request, res: Response, next: NextFunction) {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send('Internal server error');
  } 
}

export default handleErrors;
