"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = __importDefault(require("./error.controllers.ts/errors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(async () => {
    try {
        await mongoose_1.default.connect(`${process.env.DATABASE_URL}`);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
    }
})();
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/api/users", routes_1.usersRouter);
app.use("/api/reviews", routes_1.reviewsRouter);
app.use("/api/questions", routes_1.questionsRouter);
app.use("/api/countries", routes_1.countriesRouter);
app.use("/api/comments", routes_1.commentsRouter);
app.use("/api", routes_1.apiRouter);
app.use(errors_1.default);
exports.default = app;
