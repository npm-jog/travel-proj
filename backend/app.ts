import express, { Application } from "express";
import { usersRouter, reviewsRouter } from "./routes";
import dotenv from "dotenv";
import handleErrors from "./error.controllers.ts/errors";

dotenv.config();

const app: Application = express();

app.use("/users", usersRouter);

app.use("/reviews", reviewsRouter);

app.use(handleErrors);

export default app;
