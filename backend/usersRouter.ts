import express, { Express, Request, Response } from "express";

const usersRouter = express.Router();

usersRouter.get("/:user_id", (req: Request, res: Response) => {
  res.status(200).send();
});

usersRouter.post("/", (req: Request, res: Response) => {
  res.status(201).send();
});

usersRouter.delete("/:user_id", (req: Request, res: Response) => {
  res.status(204).send();
});

usersRouter.patch("/:user_id", (req: Request, res: Response) => {
  res.status(200).send();
});

export default usersRouter;
