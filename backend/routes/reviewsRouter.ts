import express, { Request, Response } from "express";
import { getReviewsByLocation, postReviewToLocation, patchReviewById, deleteReviewById } from "../controllers/reviews.controllers";

const reviewsRouter = express.Router();

reviewsRouter.get("/:location", getReviewsByLocation);
reviewsRouter.post("/:location", postReviewToLocation);
reviewsRouter.patch("/:review_id", patchReviewById);
reviewsRouter.delete("/:review_id", deleteReviewById);

export default reviewsRouter;
