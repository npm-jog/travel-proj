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
exports.insertUser = exports.removeUserById = exports.updateUserById = exports.fetchUserById = void 0;
const user_1 = __importDefault(require("./../../Database/models/user"));
//async function fetchUserById(id: Types.ObjectId): Promise<User | Error> to do when db files are in ts
function fetchUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = yield user_1.default.findById(id).exec();
            return userId;
        }
        catch (err) {
            return err;
        }
    });
}
exports.fetchUserById = fetchUserById;
function insertUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield user_1.default.create(user);
            return newUser;
        }
        catch (err) {
            return err;
        }
    });
}
exports.insertUser = insertUser;
function removeUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedUser = yield user_1.default.findByIdAndDelete(id).exec();
            return deletedUser;
        }
        catch (err) {
            return err;
        }
    });
}
exports.removeUserById = removeUserById;
function updateUserById(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const previousUser = yield user_1.default.findByIdAndUpdate(id, user).exec();
            return previousUser;
        }
        catch (err) {
            return err;
        }
    });
}
exports.updateUserById = updateUserById;
