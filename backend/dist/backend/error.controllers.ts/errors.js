"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleErrors(err, req, res, next) {
    res.status(400).send();
}
exports.default = handleErrors;
