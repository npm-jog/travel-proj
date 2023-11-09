"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.patchComment = void 0;
const mongoose_1 = require("mongoose");
const comments_models_1 = require("../models/comments.models");
function deleteComment(req, res, next) {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.comment_id)) {
        next({ status: 404, msg: "invalid Id" });
    }
    const comment_id = new mongoose_1.Types.ObjectId(req.params.comment_id);
    (0, comments_models_1.removeCommentById)(comment_id)
        .then(() => {
        res.status(204).send();
    })
        .catch((err) => {
        next(err);
    });
}
exports.deleteComment = deleteComment;
function patchComment(req, res, next) {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.comment_id)) {
        next({ status: 404, msg: "invalid Id" });
    }
    const comment_id = new mongoose_1.Types.ObjectId(req.params.comment_id);
    const updatedComment = req.body;
    (0, comments_models_1.updateCommentById)(comment_id, updatedComment)
        .then((comment) => {
        res.status(200).send({ comment });
    })
        .catch((err) => {
        next(err);
    });
}
exports.patchComment = patchComment;
