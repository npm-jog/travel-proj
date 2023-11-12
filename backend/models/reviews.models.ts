import { ReviewType } from '../types/types';
import { Types } from "mongoose";
import Review, { ReviewDocument } from "../Database/models/review";

async function fetchReviewsByLocation(countryName: string | undefined) {
  try {
    const reviews: ReviewType[] = await Review.find({ country: countryName });
    return reviews;
  } catch (err) {
    return err;
  }
}
async function addReviewToDb(reviewToCreate: ReviewDocument) {
  try {
    const newReview: ReviewType | any = await Review.create(reviewToCreate);
    return newReview;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Bad request: model validation failed" });
  }
}

async function removeReviewFromDb(reviewId: Types.ObjectId) {
  try {
    const deletedReviewResponse: ReviewType | null = await Review.findByIdAndDelete(reviewId);
    return deletedReviewResponse;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}
async function editReviewInDb(reviewId: Types.ObjectId, review: ReviewDocument) {
  try {
    const options = {
      new: true,
    };
    const updatedReviewResponse: ReviewType | null = await Review.findByIdAndUpdate(reviewId, review, options);
    if (updatedReviewResponse === null) return Promise.reject({ status: 404, msg: "Id does not exist" });
    return updatedReviewResponse;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

export { fetchReviewsByLocation, addReviewToDb, removeReviewFromDb, editReviewInDb };
