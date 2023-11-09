import { Request, Response, NextFunction } from "express";

function handleErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(400).send();
}

export default handleErrors;
