import express from "express";
import {getPublicHolidays, getWeather, getSafetyData, getCountryImages} from "../controllers/country-data.controllers";

const countryDataRouter = express.Router();

countryDataRouter.route("/public_holidays").get(getPublicHolidays);
countryDataRouter.route("/weather/:city").get(getWeather);
countryDataRouter.route("/country_safety/:country_code").get(getSafetyData);
countryDataRouter.route("/images/:country").get(getCountryImages);

export default countryDataRouter;
