"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = exports.countriesRouter = exports.reviewsRouter = exports.usersRouter = void 0;
const usersRouter_1 = __importDefault(require("./usersRouter"));
exports.usersRouter = usersRouter_1.default;
const reviewsRouter_1 = __importDefault(require("./reviewsRouter"));
exports.reviewsRouter = reviewsRouter_1.default;
const countriesRouter_1 = __importDefault(require("./countriesRouter"));
exports.countriesRouter = countriesRouter_1.default;
const apiRouter_1 = __importDefault(require("./apiRouter"));
exports.apiRouter = apiRouter_1.default;
