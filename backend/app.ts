import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.status(201).send();
});

export default app;
