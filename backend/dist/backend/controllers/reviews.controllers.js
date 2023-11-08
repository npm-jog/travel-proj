"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchReviewById = exports.deleteReviewById = exports.postReviewToLocation = exports.getReviewsByLocation = void 0;
const reviews_models_1 = require("../models/reviews.models");
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
function postReviewToLocation(req, res, next) {
    const reviewLocation = req.params.country_name;
    res.status(201).send();
    /*addReviewToDb()
        .then((x) => {
            res.status(201).send();
        })
        .catch((err: Error) => {
            next(err);
        });*/
}
exports.postReviewToLocation = postReviewToLocation;
function deleteReviewById(req, res, next) {
    (0, reviews_models_1.removeReviewFromDb)()
        .then((x) => {
        res.status(204).send();
    })
        .catch((err) => {
        next(err);
    });
}
exports.deleteReviewById = deleteReviewById;
function patchReviewById(req, res, next) {
    (0, reviews_models_1.editReviewInDb)()
        .then((x) => {
        res.status(200).send();
    })
        .catch((err) => {
        next(err);
    });
}
exports.patchReviewById = patchReviewById;
