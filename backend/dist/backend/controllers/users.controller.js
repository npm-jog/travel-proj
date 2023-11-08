"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUserById = exports.deleteUserById = exports.postUser = exports.getUserById = void 0;
const users_models_1 = require("../models/users.models");
const mongoose_1 = require("mongoose");
function getUserById(req, res, next) {
    const id = new mongoose_1.Types.ObjectId(req.params.user_id);
    (0, users_models_1.fetchUserById)(id)
        .then((user) => {
        res.status(200).send(user);
    })
        .catch((err) => {
        next(err);
    });
}
exports.getUserById = getUserById;
function postUser(req, res, next) {
    const newUser = req.body;
    (0, users_models_1.insertUser)(newUser)
        .then((user) => {
        res.status(201).send(user);
    })
        .catch((err) => {
        next(err);
    });
}
exports.postUser = postUser;
function deleteUserById(req, res, next) {
    const id = new mongoose_1.Types.ObjectId(req.params.user_id);
    (0, users_models_1.removeUserById)(id)
        .then((user) => {
        res.status(204).send(user);
    })
        .catch((err) => {
        next(err);
    });
}
exports.deleteUserById = deleteUserById;
function patchUserById(req, res, next) {
    const id = new mongoose_1.Types.ObjectId(req.params.user_id);
    const updatedUser = req.body;
    (0, users_models_1.updateUserById)(id, updatedUser)
        .then((user) => {
        res.status(200).send(user);
    })
        .catch((err) => {
        next(err);
    });
}
exports.patchUserById = patchUserById;
