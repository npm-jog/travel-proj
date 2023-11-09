"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllCountries = void 0;
const country_1 = __importDefault(require("./../../Database/models/country"));
async function fetchAllCountries() {
    try {
        const countries = await country_1.default.find();
        return countries;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "unexpected error" });
    }
}
exports.fetchAllCountries = fetchAllCountries;
