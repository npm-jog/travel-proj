"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_controllers_1 = require("../controllers/api.controllers");
const apiRouter = express_1.default.Router();
apiRouter.get("/", api_controllers_1.getAllEndpoints);
exports.default = apiRouter;
