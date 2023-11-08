"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questions_controllers_1 = require("../controllers/questions.controllers");
const questionsRouter = express_1.default.Router();
questionsRouter.get("/", questions_controllers_1.getQuestions);
questionsRouter.get("/:question_id/comments", questions_controllers_1.getCommentsByQuestionId);
questionsRouter.post("/", questions_controllers_1.postQuestion);
questionsRouter.post("/:question_id/comments", questions_controllers_1.postCommentsByQuestionId);
questionsRouter.delete("/:question_id", questions_controllers_1.deleteQuestion);
questionsRouter.patch("/:question_id", questions_controllers_1.patchQuestion);
exports.default = questionsRouter;
