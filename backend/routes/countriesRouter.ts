import express, { Request, Response } from "express";
import { getAllCountries } from "../controllers/countries.controllers";

const countriesRouter = express.Router();

countriesRouter.get("/", getAllCountries);

export default countriesRouter;
