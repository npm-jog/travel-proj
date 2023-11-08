"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = exports.questionsRouter = exports.countriesRouter = exports.reviewsRouter = exports.usersRouter = void 0;
const usersRouter_1 = __importDefault(require("./usersRouter"));
exports.usersRouter = usersRouter_1.default;
const reviewsRouter_1 = __importDefault(require("./reviewsRouter"));
exports.reviewsRouter = reviewsRouter_1.default;
const countriesRouter_1 = __importDefault(require("./countriesRouter"));
exports.countriesRouter = countriesRouter_1.default;
const questionsRouter_1 = __importDefault(require("./questionsRouter"));
exports.questionsRouter = questionsRouter_1.default;
const commentsRouter_1 = __importDefault(require("./commentsRouter"));
exports.commentsRouter = commentsRouter_1.default;
