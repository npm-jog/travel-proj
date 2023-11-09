"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const usersRouter = express_1.default.Router();
usersRouter.route("/").post(users_controller_1.postUser);
usersRouter.route("/:user_id").get(users_controller_1.getUserById).delete(users_controller_1.deleteUserById).patch(users_controller_1.patchUserById);
exports.default = usersRouter;
