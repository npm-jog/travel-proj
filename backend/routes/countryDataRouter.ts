import express from "express";
import getCountryData from "../controllers/country-data.controller";

const countryDataRouter = express.Router();

countryDataRouter.route("/public_holidays").get(getCountryData);

export default countryDataRouter;
