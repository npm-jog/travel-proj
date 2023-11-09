import { Types, Document } from "mongoose";
import Review from "./../../Database/models/review";

async function fetchReviewsByLocation(countryName: string | undefined) {
  try {
    const reviews = await Review.find({ country: countryName });
    return reviews;
  } catch (err) {
    return err;
  }
}
async function addReviewToDb(reviewToCreate: Document) {
  try {
    const newReview = await Review.create(reviewToCreate);
    return newReview;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Bad request: model validation failed" });
  }
}

async function removeReviewFromDb(reviewId: Types.ObjectId) {
  try {
    const deletedReviewResponse = await Review.findByIdAndDelete(reviewId);
    return deletedReviewResponse;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}
async function editReviewInDb(reviewId: Types.ObjectId, review: Document) {
  try {
    const options = {
      new: true,
    };
    const updatedReviewResponse = await Review.findByIdAndUpdate(reviewId, review, options);
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

export { fetchReviewsByLocation, addReviewToDb, removeReviewFromDb, editReviewInDb };
