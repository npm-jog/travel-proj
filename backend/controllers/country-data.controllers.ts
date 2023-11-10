import { Request, Response, NextFunction } from "express";
import { fetchWeatherData } from "../models/country-data.models";

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

export { getWeather };
