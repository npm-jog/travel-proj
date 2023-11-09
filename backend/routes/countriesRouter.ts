import express, { Request, Response } from "express";
import { getAllCountries } from "../controllers/countries.controllers";

const countriesRouter = express.Router();

countriesRouter.route("/").get(getAllCountries);

export default countriesRouter;
