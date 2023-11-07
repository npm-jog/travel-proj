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
