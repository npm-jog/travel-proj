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
exports.insertCommentByQuestionId = exports.fetchCommentsByQuestionId = exports.insertQuestion = exports.removeQuestionById = exports.updateQuestionById = exports.fetchQuestions = void 0;
const question_1 = __importDefault(require("../../Database/models/question"));
const comment_1 = __importDefault(require("../../Database/models/comment"));
function fetchQuestions(country) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!country) {
                const questions = yield question_1.default.find({});
                return questions;
            }
            else {
                const questions = yield question_1.default.find({ country: country });
                return questions;
            }
        }
        catch (err) {
            return err;
        }
    });
}
exports.fetchQuestions = fetchQuestions;
function updateQuestionById(question_id, question) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                new: true,
            };
            const updatedQuestion = yield question_1.default.findByIdAndUpdate(question_id, question, options);
            return updatedQuestion;
        }
        catch (err) {
            return err;
        }
    });
}
exports.updateQuestionById = updateQuestionById;
function removeQuestionById(question_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedQuestion = yield question_1.default.findByIdAndDelete(question_id);
            return deletedQuestion;
        }
        catch (err) {
            return err;
        }
    });
}
exports.removeQuestionById = removeQuestionById;
function insertQuestion(question) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newQuestion = yield question_1.default.create(question);
            return newQuestion;
        }
        catch (err) {
            return err;
        }
    });
}
exports.insertQuestion = insertQuestion;
function fetchCommentsByQuestionId(question_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const comments = yield comment_1.default.find({ question_id: question_id });
            return comments;
        }
        catch (err) {
            return err;
        }
    });
}
exports.fetchCommentsByQuestionId = fetchCommentsByQuestionId;
function insertCommentByQuestionId(question_id, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newComment = yield comment_1.default.create(comment);
            return newComment;
        }
        catch (err) {
            return err;
        }
    });
}
exports.insertCommentByQuestionId = insertCommentByQuestionId;
