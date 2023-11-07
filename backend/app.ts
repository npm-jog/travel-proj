import express, { Application } from "express";
import { usersRouter, wishlistRouter } from "./routes";
import dotenv from "dotenv";
import handleErrors from "./error.controllers.ts/errors";

dotenv.config();

const app: Application = express();

app.use("/api/users", usersRouter);

app.use("/api/wishlist", wishlistRouter);

app.use(handleErrors);

export default app;
