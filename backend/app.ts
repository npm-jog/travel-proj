import express, { Application } from "express";
import {usersRouter} from "./routes";
import dotenv from "dotenv";
import handleErrors from './error.controllers.ts/errors';

dotenv.config();

const app: Application = express();

app.use("/users", usersRouter);

app.use(handleErrors);

export default app;
