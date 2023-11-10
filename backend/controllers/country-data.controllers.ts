import { Request, Response, NextFunction } from "express";
import { fetchWeatherData } from '../models/country-data.models'

function getCountryData(req: Request, res: Response, next: NextFunction) {
    fetchWeatherData().then(x => {
        res.status(200).send();
    }).catch((err: Error) => {
        next(err)
    })
}

export default getCountryData;