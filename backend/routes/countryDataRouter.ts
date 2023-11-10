import express from "express";
import {getPublicHolidays, getWeather} from "../controllers/country-data.controllers";

const countryDataRouter = express.Router();

countryDataRouter.route("/public_holidays").get(getPublicHolidays);
countryDataRouter.route("/weather/:city").get(getWeather);

export default countryDataRouter;
