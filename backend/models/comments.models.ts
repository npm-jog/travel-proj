import Comment, { CommentDocument } from "../Database/models/comment";
import { CommentType } from '../interfaces/response.interfaces';
import { Types } from "mongoose";

async function updateCommentById(comment_id: Types.ObjectId, comment: CommentDocument) {
  try {
    const options = {
      new: true,
    };
    const updatedComment: CommentType | null = await Comment.findByIdAndUpdate(comment_id, comment, options);
    return updatedComment;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist or model not valid" });
  }
}

async function removeCommentById(comment_id: Types.ObjectId) {
  try {
    const deletedComment: CommentType | null = await Comment.findByIdAndDelete(comment_id);
    return deletedComment;
  } catch (err) {
    return Promise.reject({ status: 400, msg: "Id does not exist" });
  }
}

export { updateCommentById, removeCommentById };
