import { UserType } from "../interfaces/response.interfaces";
import User, { UserDocument } from "../Database/models/user";
import { Types } from "mongoose";

async function fetchUserById(id: Types.ObjectId) {
  try {
    const user: UserType | null = await User.findById(id);
    return user;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}
async function fetchUserByEmail(email: string) {
  try {
    const user: UserType | null = await User.findOne({ email: email });
    if (!user) {
      return Promise.reject({ status: 400, msg: "User does not exist" });
    }
    return user;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

async function insertUser(user: UserDocument) {
  try {
    const newUser: UserType | any = await User.create(user);
    return newUser;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Bad request: model validation failed" });
  }
}

async function removeUserById(id: Types.ObjectId) {
  try {
    const deletedUser: UserType | null = await User.findByIdAndDelete(id);
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
    const updatedUser: UserType | null = await User.findByIdAndUpdate(id, user, options);
    return updatedUser;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

export { fetchUserById, fetchUserByEmail, updateUserById, removeUserById, insertUser };
