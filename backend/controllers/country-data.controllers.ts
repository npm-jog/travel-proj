import { Request, Response, NextFunction } from "express";
import { fetchPublicHolidays, fetchWeatherData } from "../models/country-data.models";

function getPublicHolidays(req: Request, res: Response, next: NextFunction) {
  const year: string = req.query.year as string;
  const countryCode: string = req.query.country_code as string;
  fetchPublicHolidays(year, countryCode).then(publicHolidays => {
      res.status(200).send({publicHolidays});
  }).catch((err: any) => {
      next(err)
  })
}

function getWeather(req: Request, res: Response, next: NextFunction) {
  const city: string = req.params.city;
  const apiUrl = `https://api.weatherapi.com/v1/current.json?q=${city}&key=bd4f55c0f6554952bad124252231105`;

  fetchWeatherData(apiUrl)
    .then((weather) => {
      res.status(200).send(weather);
    })
    .catch((err: Error) => {
      next(err);
    });
}

export { getPublicHolidays, getWeather };
