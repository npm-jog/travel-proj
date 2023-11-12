import express, { Application, Request, Response, NextFunction } from "express";
import { usersRouter, reviewsRouter, countriesRouter, apiRouter, questionsRouter, commentsRouter, countryDataRouter } from "./routes";

import dotenv from "dotenv";
import cors from "cors";
import handleErrors from "./error.controllers.ts/errors";
import connectDB from "./Database/connection";
dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

(async () => {
  await connectDB();
})();

app.use("/api/users", usersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/countries", countriesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/country_data", countryDataRouter)
app.use("/api", apiRouter);

app.all('/*', (req: Request, res: Response, next: NextFunction) => {
  next({status: 404, msg: 'Bad api endpoint'});
})

app.use(handleErrors);

export default app;
