import { Request, Response, NextFunction } from "express";
import { fetchPublicHolidays } from '../models/country-data.models'

function getCountryData(req: Request, res: Response, next: NextFunction) {
    const year: string = req.query.year as string;
    const countryCode: string = req.query.country_code as string;
    fetchPublicHolidays(year, countryCode).then(publicHolidays => {
        res.status(200).send({publicHolidays});
    }).catch((err: any) => {
        next(err)
    })
}

export default getCountryData;