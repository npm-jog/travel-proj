"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questions_controllers_1 = require("../controllers/questions.controllers");
const questionsRouter = express_1.default.Router();
questionsRouter.route("/").get(questions_controllers_1.getQuestions).post(questions_controllers_1.postQuestion);
questionsRouter.route("/:question_id/comments").get(questions_controllers_1.getCommentsByQuestionId).post(questions_controllers_1.postCommentsByQuestionId);
questionsRouter.route("/:question_id").delete(questions_controllers_1.deleteQuestion).patch(questions_controllers_1.patchQuestion);
exports.default = questionsRouter;
