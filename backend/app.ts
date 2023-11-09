import express, { Express, Request, Response } from "express";
import {
  usersRouter,
  reviewsRouter,
  countriesRouter,
  apiRouter,
 questionsRouter, commentsRouter
} from "./routes";

import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import handleErrors from "./error.controllers.ts/errors";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/users", usersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/countries", countriesRouter);

app.use("/api/comments", commentsRouter);
app.use("/api", apiRouter);

app.use(handleErrors);

export default app;
