"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviews_controllers_1 = require("../controllers/reviews.controllers");
const reviewsRouter = express_1.default.Router();
reviewsRouter.get("/:country_name", reviews_controllers_1.getReviewsByLocation);
reviewsRouter.post("/:country_name", reviews_controllers_1.postReview);
reviewsRouter.patch("/:review_id", reviews_controllers_1.patchReviewById);
reviewsRouter.delete("/:review_id", reviews_controllers_1.deleteReviewById);
exports.default = reviewsRouter;
