import Comment from "../../Database/models/comment";
import { Types, Document } from "mongoose";

async function updateCommentById(comment_id: Types.ObjectId, comment: Document) {
  try {
    const options = {
      new: true,
    };
    const updatedComment = await Comment.findByIdAndUpdate(comment_id, comment, options);
    return updatedComment;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function removeCommentById(comment_id: Types.ObjectId) {
  try {
    const deletedComment = await Comment.findByIdAndDelete(comment_id);
    return deletedComment;
  } catch (err) {
    return Promise.reject(err);
  }
}

export { updateCommentById, removeCommentById };
