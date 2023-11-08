import { Request, Response, NextFunction } from "express";
import { fetchAllCountries } from "../models/countries.models";

function getAllCountries(req: Request, res: Response, next: NextFunction) {
  fetchAllCountries()
    .then((countries) => {
      res.status(200).send({ countries });
    })
    .catch((err: Error) => {
      next(err);
    });
}

export { getAllCountries };
