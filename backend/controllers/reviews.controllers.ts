import { Request, Response, NextFunction } from "express";
import { fetchReviewsByLocation, addReviewToDb, removeReviewFromDb, editReviewInDb } from "../models/reviews.models";
import { Types } from "mongoose";
import Review from "../Database/models/review";

function getReviewsByLocation(req: Request, res: Response, next: NextFunction) {
  const reviewLocation: string | undefined = req.params.country_name as string | undefined;
  fetchReviewsByLocation(reviewLocation)
    .then((reviews: any) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
}

function postReview(req: Request, res: Response, next: NextFunction) {
  const newReview = new Review(req.body);
  addReviewToDb(newReview)
    .then((postedReview) => {
      res.status(201).send({ postedReview });
    })
    .catch((err) => {
      next(err);
    });
}

function deleteReviewById(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.review_id)) {
    next({ status: 404, msg: "invalid Id" });
  }
  const review_id: Types.ObjectId = new Types.ObjectId(req.params.review_id);
  removeReviewFromDb(review_id)
    .then((x) => {
      res.status(204).send(x);
    })
    .catch((err) => {
      next(err);
    });
}

function patchReviewById(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.review_id)) {
    next({ status: 404, msg: "invalid Id" });
  }
  const review_id: Types.ObjectId = new Types.ObjectId(req.params.review_id);
  const updatedReview = new Review(req.body);
  editReviewInDb(review_id, updatedReview)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err: Error) => {
      next(err);
    });
}

export { getReviewsByLocation, postReview, deleteReviewById, patchReviewById };
