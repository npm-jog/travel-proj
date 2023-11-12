import { Request, Response, NextFunction } from "express";
import { fetchAllCountries } from "../models/countries.models";
import { CountryType } from '../interfaces/response.interfaces';

function getAllCountries(req: Request, res: Response, next: NextFunction) {
  fetchAllCountries()
    .then((countries: CountryType[]) => {
      res.status(200).send({ countries });
    })
    .catch((err: Error) => {
      next(err);
    });
}

export { getAllCountries };
