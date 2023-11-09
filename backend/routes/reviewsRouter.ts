import express, { Request, Response } from "express";
import { getReviewsByLocation, postReview, patchReviewById, deleteReviewById } from "../controllers/reviews.controllers";

const reviewsRouter = express.Router();

reviewsRouter.get("/:country_name", getReviewsByLocation);
reviewsRouter.post("/:country_name", postReview);
reviewsRouter.patch("/:review_id", patchReviewById);
reviewsRouter.delete("/:review_id", deleteReviewById);

export default reviewsRouter;
