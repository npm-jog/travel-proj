"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    body: { type: String, required: true },
    ratings: {
        safety: { type: Number, required: true },
        food: { type: Number, required: true },
        activities: { type: Number, required: true },
        cost: { type: Number, required: true },
        scenery: { type: Number, required: true },
    },
    pictures: [String],
    country: { type: String, required: true },
    reported_count: { type: Number, default: 0 },
    user_interactions: [{ username: String, reported: { type: Boolean, default: false } }],
}, { minimize: false });
const Review = mongoose_1.default.model("review", reviewSchema);
exports.default = Review;
