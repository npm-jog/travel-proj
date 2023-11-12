import { Request, Response, NextFunction } from "express";
import { fetchPublicHolidays, fetchWeatherData, fetchSafetyData } from "../models/country-data.models";
import { PublicHolidays, WeatherData, SafetyData, RequestError } from "../types/types";

function getPublicHolidays(req: Request, res: Response, next: NextFunction) {
  const year: string = req.query.year as string;
  const countryCode: string = req.query.country_code as string;
  fetchPublicHolidays(year, countryCode)
    .then((publicHolidays: PublicHolidays) => {
      res.status(200).send({ publicHolidays });
    })
    .catch((err: RequestError | any) => {
      next(err);
    });
}

function getWeather(req: Request, res: Response, next: NextFunction) {
  const city: string = req.params.city as string;
  const apiUrl: string = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${process.env.WEATHER_API}`;

  fetchWeatherData(apiUrl)
    .then((weather) => {
      res.status(200).send({ weather });
    })
    .catch((err) => {
      next(err);
    });
}

function getSafetyData(req: Request, res: Response, next: NextFunction) {
  const countryCode: string = req.params.country_code;
  fetchSafetyData(countryCode)
    .then((safetyData: SafetyData) => {
      res.status(200).send({ safetyData });
    })
    .catch((err: RequestError | any) => {
      next(err);
    });
}

export { getPublicHolidays, getWeather, getSafetyData };
