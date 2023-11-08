import User from "./../../Database/models/user";
import { Types, Document } from "mongoose";

//async function fetchUserById(id: Types.ObjectId): Promise<User | Error> to do when db files are in ts

async function fetchUserById(id: Types.ObjectId) {
  try {
    const userId = await User.findById(id).exec();

    return userId;
  } catch (err) {
    return err;
  }
}

async function updateUserById(id: Types.ObjectId, user: Document) {
  try {
    const previousUser = await User.findByIdAndUpdate(id, user).exec();

    return previousUser;
  } catch (err) {
    return err;
  }
}

async function removeUserById(id: Types.ObjectId) {
  try {
    const deletedUser = await User.findByIdAndDelete(id).exec();

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
