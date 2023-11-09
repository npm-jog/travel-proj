"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleErrors(err, req, res, next) {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    }
    else {
        res.status(400).send(err);
    }
}
exports.default = handleErrors;
