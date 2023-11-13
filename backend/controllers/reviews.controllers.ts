import { Request, Response, NextFunction } from "express";
import { fetchReviewsByLocation, addReviewToDb, removeReviewFromDb, editReviewInDb } from "../models/reviews.models";
import { ReviewType } from "../interfaces/response.interfaces";
import { Types } from "mongoose";
import Review from "../Database/models/review";

function getReviewsByLocation(req: Request, res: Response, next: NextFunction) {
  const reviewLocation: string | undefined = req.params.country_name as string | undefined;
  fetchReviewsByLocation(reviewLocation)
    .then((reviews: ReviewType[] | any) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
}

function postReview(req: Request, res: Response, next: NextFunction) {
  const newReview = new Review(req.body);
  addReviewToDb(newReview)
    .then((postedReview: ReviewType) => {
      res.status(201).send({ postedReview });
    })
    .catch((err) => {
      next(err);
    });
}

function deleteReviewById(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.review_id)) {
    next({ status: 400, msg: "Invalid Id" });
  }
  const review_id: Types.ObjectId = new Types.ObjectId(req.params.review_id);
  removeReviewFromDb(review_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
}

function patchReviewById(req: Request, res: Response, next: NextFunction) {
  if (!Types.ObjectId.isValid(req.params.review_id)) {
    next({ status: 400, msg: "Invalid Id" });
  }
  const review_id: Types.ObjectId = new Types.ObjectId(req.params.review_id);
  const updatedReview = new Review(req.body);
  updatedReview._id = review_id;
  const validationErrors = updatedReview.validateSync();
  if (validationErrors) {
    next({ status: 400, msg: validationErrors.message });
  }
  editReviewInDb(review_id, updatedReview)
    .then((review: ReviewType) => {
      res.status(200).send({ review });
    })
    .catch((err: Error) => {
      next(err);
    });
}

export { getReviewsByLocation, postReview, deleteReviewById, patchReviewById };
