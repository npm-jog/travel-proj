import User from "./../../Database/models/user";
import { Types, Document } from "mongoose";

async function fetchUserById(id: Types.ObjectId) {
  try {
    const userId = await User.findById(id);

    return userId;
  } catch (err) {
    return err;
  }
}

async function updateUserById(id: Types.ObjectId, user: Document) {
  try {
    const options = {
      new: true,
    };
    const updatedUser = await User.findByIdAndUpdate(id, user, options);

    return updatedUser;
  } catch (err) {
    return err;
  }
}

async function removeUserById(id: Types.ObjectId) {
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    return deletedUser;
  } catch (err) {
    return err;
  }
}
async function insertUser(user: Document) {
  try {
    const newUser = await User.create(user);

    return newUser;
  } catch (err) {
    return err;
  }
}

export { fetchUserById, updateUserById, removeUserById, insertUser };
