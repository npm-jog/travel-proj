"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
    path: `${__dirname}/../.env.${ENV}`,
});
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL not set");
        }
        try {
            yield mongoose.connect(process.env.DATABASE_URL);
            console.log(`MongoDB connected successfully to ${ENV} DB`);
            console.log(process.env.NODE_ENV);
            console.log(process.env.DATABASE_URL);
        }
        catch (err) {
            console.error("MongoDB connection failed:", err);
        }
    });
}
module.exports = connectDB;
