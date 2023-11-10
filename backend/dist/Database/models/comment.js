"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    question_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "questions", required: true },
    username: { type: String, required: true },
    body: { type: String, required: true },
    likes: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    reported_count: { type: Number, default: 0 },
    user_interactions: [{ username: String, vote: { type: Number, default: 0 }, reported: { type: Boolean, default: false } }],
}, { minimize: false });
const Comment = mongoose_1.default.model("comment", commentSchema);
exports.default = Comment;
