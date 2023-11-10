"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    forename: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    avatar_url: { type: String, default: "https://avatar.iran.liara.run/public" },
    visited_locations: { type: [String], default: [] },
    wishlist: { type: [String], default: [] },
    albums: { type: [{ country: String, url: String }], default: [] },
}, { minimize: false });
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
