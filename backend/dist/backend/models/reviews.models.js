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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editReviewInDb = exports.removeReviewFromDb = exports.addReviewToDb = exports.fetchReviewsByLocation = void 0;
const review_1 = __importDefault(require("./../../Database/models/review"));
function fetchReviewsByLocation(countryName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reviews = yield review_1.default.find({ country: countryName });
            return reviews;
        }
        catch (err) {
            return err;
        }
    });
}
exports.fetchReviewsByLocation = fetchReviewsByLocation;
//countryName: string | undefined
function addReviewToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //{country: countryName}
            const reviews = yield review_1.default.find();
            return reviews;
        }
        catch (err) {
            return err;
        }
    });
}
exports.addReviewToDb = addReviewToDb;
function removeReviewFromDb() {
    const myPromise = new Promise((resolve, reject) => {
        resolve("hello" + "world");
    });
    return myPromise;
}
exports.removeReviewFromDb = removeReviewFromDb;
function editReviewInDb() {
    const myPromise = new Promise((resolve, reject) => {
        resolve("hello" + "world");
    });
    return myPromise;
}
exports.editReviewInDb = editReviewInDb;
