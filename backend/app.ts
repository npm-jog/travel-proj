import express, { Express, Request, Response } from "express";
import { usersRouter, reviewsRouter } from "./routes";

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

app.get("/test", (req, res) => {
  res.status(200).send({ test: "test" });
});

app.use("/api/users", usersRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/reviews", reviewsRouter);

app.use(handleErrors);

export default app;
