"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const questionSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    likes: { type: Number, default: 0 },
    topic: { type: String, default: "general" },
    country: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    reported_count: { type: Number, default: 0 },
    user_interactions: [{ username: String, vote: { type: Number, default: 0 }, reported: { type: Boolean, default: false } }],
}, { minimize: false });
const Question = mongoose_1.default.model("question", questionSchema);
exports.default = Question;
