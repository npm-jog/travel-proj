"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCommentsByQuestionId = exports.getCommentsByQuestionId = exports.patchQuestion = exports.deleteQuestion = exports.postQuestion = exports.getQuestions = void 0;
const mongoose_1 = require("mongoose");
const questions_models_1 = require("../models/questions.models");
function getQuestions(req, res, next) {
    const country = req.query.country;
    (0, questions_models_1.fetchQuestions)(country)
        .then((questions) => {
        res.status(200).send(questions);
    })
        .catch((err) => {
        next(err);
    });
}
exports.getQuestions = getQuestions;
function postQuestion(req, res, next) {
    const newQuestion = req.body;
    (0, questions_models_1.insertQuestion)(newQuestion)
        .then((question) => {
        res.status(201).send(question);
    })
        .catch((err) => {
        next(err);
    });
}
exports.postQuestion = postQuestion;
function deleteQuestion(req, res, next) {
    const question_id = new mongoose_1.Types.ObjectId(req.params.question_id);
    (0, questions_models_1.removeQuestionById)(question_id)
        .then(() => {
        res.status(204).send();
    })
        .catch((err) => {
        next(err);
    });
}
exports.deleteQuestion = deleteQuestion;
function patchQuestion(req, res, next) {
    const question_id = new mongoose_1.Types.ObjectId(req.params.question_id);
    const updatedQuestion = req.body;
    (0, questions_models_1.updateQuestionById)(question_id, updatedQuestion)
        .then((question) => {
        res.status(200).send(question);
    })
        .catch((err) => {
        next(err);
    });
}
exports.patchQuestion = patchQuestion;
function getCommentsByQuestionId(req, res, next) {
    const question_id = new mongoose_1.Types.ObjectId(req.params.question_id);
    (0, questions_models_1.fetchCommentsByQuestionId)(question_id)
        .then((comments) => {
        res.status(200).send(comments);
    })
        .catch((err) => {
        next(err);
    });
}
exports.getCommentsByQuestionId = getCommentsByQuestionId;
function postCommentsByQuestionId(req, res, next) {
    const question_id = new mongoose_1.Types.ObjectId(req.params.question_id);
    const newComment = req.body;
    (0, questions_models_1.insertCommentByQuestionId)(question_id, newComment)
        .then((newComment) => {
        res.status(200).send(newComment);
    })
        .catch((err) => {
        next(err);
    });
}
exports.postCommentsByQuestionId = postCommentsByQuestionId;
