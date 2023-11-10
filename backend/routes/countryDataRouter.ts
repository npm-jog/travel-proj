import express from "express";
import getCountryData from "../controllers/country-data.controllers";

const countryDataRouter = express.Router();

countryDataRouter.route("/public-holidays").get(getCountryData);

export default countryDataRouter;
