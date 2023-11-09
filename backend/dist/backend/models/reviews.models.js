"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editReviewInDb = exports.removeReviewFromDb = exports.addReviewToDb = exports.fetchReviewsByLocation = void 0;
const review_1 = __importDefault(require("./../../Database/models/review"));
async function fetchReviewsByLocation(countryName) {
    try {
        const reviews = await review_1.default.find({ country: countryName });
        return reviews;
    }
    catch (err) {
        return err;
    }
}
exports.fetchReviewsByLocation = fetchReviewsByLocation;
async function addReviewToDb(reviewToCreate) {
    try {
        const newReview = await review_1.default.create(reviewToCreate);
        return newReview;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Bad request: model validation failed" });
    }
}
exports.addReviewToDb = addReviewToDb;
async function removeReviewFromDb(reviewId) {
    try {
        const deletedReviewResponse = await review_1.default.findByIdAndDelete(reviewId);
        return deletedReviewResponse;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Id does not exist" });
    }
}
exports.removeReviewFromDb = removeReviewFromDb;
async function editReviewInDb(reviewId, review) {
    try {
        const options = {
            new: true,
        };
        const updatedReviewResponse = await review_1.default.findByIdAndUpdate(reviewId, review, options);
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Id does not exist" });
    }
}
exports.editReviewInDb = editReviewInDb;
