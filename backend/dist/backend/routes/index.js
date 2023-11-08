"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRouter = exports.wishlistRouter = exports.usersRouter = void 0;
const usersRouter_1 = __importDefault(require("./usersRouter"));
exports.usersRouter = usersRouter_1.default;
const wishlistRouter_1 = __importDefault(require("./wishlistRouter"));
exports.wishlistRouter = wishlistRouter_1.default;
const reviewsRouter_1 = __importDefault(require("./reviewsRouter"));
exports.reviewsRouter = reviewsRouter_1.default;
