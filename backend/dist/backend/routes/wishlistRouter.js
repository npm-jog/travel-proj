"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("../controllers/wishlist.controller");
const wishlistRouter = express_1.default.Router();
wishlistRouter.get("/:user_id", wishlist_controller_1.getWishlistByUserId);
wishlistRouter.post("/:user_id", wishlist_controller_1.postLocationByUserId);
wishlistRouter.delete("/:user_id/:country_name", wishlist_controller_1.deleteLocationByCountryName);
exports.default = wishlistRouter;
