import express from "express";
import { getWeather } from "../controllers/country-data.controllers";

const countryDataRouter = express.Router();

countryDataRouter.route("/weather/:city").get(getWeather);

export default countryDataRouter;
