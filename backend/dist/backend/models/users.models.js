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
exports.fetchUserById = void 0;
const user_1 = __importDefault(require("./../../Database/models/user"));
function fetchUserById() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findById("654a18a6ced4e391e30cbb0b");
            console.log(user);
            return user;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.fetchUserById = fetchUserById;
