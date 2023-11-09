import express, { Request, Response } from "express";
import { getAllEndpoints } from "../controllers/api.controllers";

const apiRouter = express.Router();

apiRouter.get("/", getAllEndpoints);

export default apiRouter;
