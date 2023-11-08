"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountries = void 0;
const countries_models_1 = require("../models/countries.models");
function getAllCountries(req, res, next) {
    (0, countries_models_1.fetchAllCountries)()
        .then((countries) => {
        res.status(200).send({ countries });
    })
        .catch((err) => {
        next(err);
    });
}
exports.getAllCountries = getAllCountries;
