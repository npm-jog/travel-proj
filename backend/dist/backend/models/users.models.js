"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = exports.removeUserById = exports.updateUserById = exports.fetchUserById = void 0;
const user_1 = __importDefault(require("./../../Database/models/user"));
async function fetchUserById(id) {
    try {
        const userId = await user_1.default.findById(id);
        return userId;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Id does not exist" });
    }
}
exports.fetchUserById = fetchUserById;
async function insertUser(user) {
    try {
        const newUser = await user_1.default.create(user);
        return newUser;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Bad request: model validation failed" });
    }
}
exports.insertUser = insertUser;
async function removeUserById(id) {
    try {
        const deletedUser = await user_1.default.findByIdAndDelete(id);
        return deletedUser;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Id does not exist" });
    }
}
exports.removeUserById = removeUserById;
async function updateUserById(id, user) {
    try {
        const options = {
            new: true,
        };
        const updatedUser = await user_1.default.findByIdAndUpdate(id, user, options);
        return updatedUser;
    }
    catch (err) {
        return Promise.reject({ status: 400, msg: "Id does not exist" });
    }
}
exports.updateUserById = updateUserById;
