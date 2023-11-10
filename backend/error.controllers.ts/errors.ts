import { Request, Response, NextFunction } from "express";

function handleErrors(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    //res.status(400).send(err);
    res.status(500).send('Internal server error');
  } 
}

export default handleErrors;
