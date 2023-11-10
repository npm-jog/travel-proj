import Comment from "../Database/models/comment";
import { Types, Document } from "mongoose";

async function updateCommentById(comment_id: Types.ObjectId, comment: Comment) {
  try {
    const options = {
      new: true,
    };
    const updatedComment = await Comment.findByIdAndUpdate(comment_id, comment, options);
    return updatedComment;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist or model not valid" });
  }
}

async function removeCommentById(comment_id: Types.ObjectId) {
  try {
    const deletedComment = await Comment.findByIdAndDelete(comment_id);
    return deletedComment;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

export { updateCommentById, removeCommentById };
