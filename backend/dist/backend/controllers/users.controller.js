"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUserById = exports.deleteUserById = exports.postUser = exports.getUserById = void 0;
const users_models_1 = require("../models/users.models");
function getUserById(req, res, next) {
    (0, users_models_1.fetchUserById)()
        .then((x) => {
        res.status(200).send(x);
    })
        .catch((err) => {
        next(err);
    });
}
exports.getUserById = getUserById;
function postUser(req, res, next) {
    res.status(201).send();
}
exports.postUser = postUser;
function deleteUserById(req, res, next) {
    res.status(204).send();
}
exports.deleteUserById = deleteUserById;
function patchUserById(req, res, next) {
    res.status(200).send();
}
exports.patchUserById = patchUserById;
