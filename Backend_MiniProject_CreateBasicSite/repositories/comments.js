import { Comments, INCLUDE_USER, ORDER_DESC } from "../models/comments.js";

class CommentRepository {
  createComment = async (comment, userId) => {
    return await Comments.create({ comment, userUserId: userId });
  };

  getallComment = async () => {
    return await Comments.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
  };

  getByCommentId = async (commentId) => {
    return await Comments.findOne({
      where: { commentId },
      ...INCLUDE_USER,
    });
  };
  updateComment = async (comment, commentId) => {
    return await Comments.findByPk(commentId, INCLUDE_USER).then((comments) => {
      comments.comment = comment;
      return comments.save();
    });
  };

  removeComment = async (commentId) => {
    return await Comments.findByPk(commentId).then((comment) => {
      comment.destroy();
    });
  };
}

export default CommentRepository;
