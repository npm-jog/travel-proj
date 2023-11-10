import User, { UserDocument } from "../Database/models/user";
import { Types, Document } from "mongoose";

async function fetchUserById(id: Types.ObjectId) {
  try {
    const userId = await User.findById(id);
    return userId;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

async function insertUser(user: UserDocument) {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Bad request: model validation failed" });
  }
}

async function removeUserById(id: Types.ObjectId) {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

async function updateUserById(id: Types.ObjectId, user: UserDocument) {
  try {
    const options = {
      new: true,
    };
    const updatedUser = await User.findByIdAndUpdate(id, user, options);
    return updatedUser;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

export { fetchUserById, updateUserById, removeUserById, insertUser };
