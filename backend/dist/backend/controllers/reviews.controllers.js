"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchReviewById = exports.deleteReviewById = exports.postReview = exports.getReviewsByLocation = void 0;
const reviews_models_1 = require("../models/reviews.models");
const mongoose_1 = require("mongoose");
function getReviewsByLocation(req, res, next) {
    const reviewLocation = req.params.country_name;
    (0, reviews_models_1.fetchReviewsByLocation)(reviewLocation)
        .then((reviews) => {
        res.status(200).send({ reviews });
    })
        .catch((err) => {
        next(err);
    });
}
exports.getReviewsByLocation = getReviewsByLocation;
function postReview(req, res, next) {
    const newReview = req.body;
    (0, reviews_models_1.addReviewToDb)(newReview)
        .then((postedReview) => {
        res.status(201).send({ postedReview });
    })
        .catch((err) => {
        next(err);
    });
}
exports.postReview = postReview;
function deleteReviewById(req, res, next) {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.review_id)) {
        next({ status: 404, msg: "invalid Id" });
    }
    const review_id = new mongoose_1.Types.ObjectId(req.params.review_id);
    (0, reviews_models_1.removeReviewFromDb)(review_id)
        .then((x) => {
        res.status(204).send(x);
    })
        .catch((err) => {
        next(err);
    });
}
exports.deleteReviewById = deleteReviewById;
function patchReviewById(req, res, next) {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.review_id)) {
        next({ status: 404, msg: "invalid Id" });
    }
    const review_id = new mongoose_1.Types.ObjectId(req.params.review_id);
    const updatedReview = req.body;
    (0, reviews_models_1.editReviewInDb)(review_id, updatedReview)
        .then((review) => {
        res.status(200).send({ review });
    })
        .catch((err) => {
        next(err);
    });
}
exports.patchReviewById = patchReviewById;
