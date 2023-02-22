import { Comments, INCLUDE_USER, ORDER_DESC } from "../models/comments.js";

class CommentRepository {
  commentCreate = async (comment, userId) => {
    return await Comments.create({ comment, userUserId: userId });
  };

  commentGetAll = async () => {
    return await Comments.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
  };

  getById = async (commentId) => {
    return await Comments.findOne({
      where: { commentId },
      ...INCLUDE_USER,
    });
  };
  commentUpdate = async (comment, commentId) => {
    return await Comments.findByPk(commentId, INCLUDE_USER).then((comments) => {
      comments.comment = comment;
      return comments.save();
    });
  };

  commentRemove = async (commentId) => {
    return await Comments.findByPk(commentId) //
      .then((comment) => {
        comment.destroy();
      });
  };
}

export default CommentRepository;
