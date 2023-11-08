import { Request, Response, NextFunction } from "express";
import * as api from "../endpoints.json";

function getAllEndpoints(req: Request, res: Response, next: NextFunction) {
  res.status(200).send(api);
}

export { getAllEndpoints };
