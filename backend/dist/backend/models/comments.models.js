"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCommentById = exports.updateCommentById = void 0;
const comment_1 = __importDefault(require("../../Database/models/comment"));
function updateCommentById(comment_id, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                new: true,
            };
            const updatedComment = yield comment_1.default.findByIdAndUpdate(comment_id, comment, options);
            return updatedComment;
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.updateCommentById = updateCommentById;
function removeCommentById(comment_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedComment = yield comment_1.default.findByIdAndDelete(comment_id);
            return deletedComment;
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.removeCommentById = removeCommentById;
