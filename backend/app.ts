import express, { Express, Request, Response, Application } from "express";
import usersRouter from "./usersRouter";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.use("/users", usersRouter);

export default app;
