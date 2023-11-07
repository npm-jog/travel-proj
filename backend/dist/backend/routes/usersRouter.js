"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const usersRouter = express_1.default.Router();
usersRouter.get("/:user_id", users_controller_1.getUserById);
usersRouter.post("/", users_controller_1.postUser);
usersRouter.delete("/:user_id", users_controller_1.deleteUserById);
usersRouter.patch("/:user_id", users_controller_1.patchUserById);
exports.default = usersRouter;
