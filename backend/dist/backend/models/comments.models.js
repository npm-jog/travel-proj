"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCommentById = exports.updateCommentById = void 0;
const comment_1 = __importDefault(require("../../Database/models/comment"));
async function updateCommentById(comment_id, comment) {
    try {
        const options = {
            new: true,
        };
        const updatedComment = await comment_1.default.findByIdAndUpdate(comment_id, comment, options);
        return updatedComment;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Id does not exist or model not valid" });
    }
}
exports.updateCommentById = updateCommentById;
async function removeCommentById(comment_id) {
    try {
        const deletedComment = await comment_1.default.findByIdAndDelete(comment_id);
        return deletedComment;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Id does not exist" });
    }
}
exports.removeCommentById = removeCommentById;
