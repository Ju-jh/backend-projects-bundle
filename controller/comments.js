import CommentService from "../services/comments.js";

class CommentController {
  commentService = new CommentService();

  createComment = async (req, res) => {
    return await this.commentService.createCommentService(req, res);
  };

  getAllComment = async (_, res) => {
    return await this.commentService.getAllCommentService(_, res);
  };

  updateComment = async (req, res) => {
    return await this.commentService.updateCommentService(req, res);
  };

  deleteComment = async (req, res) => {
    return await this.commentService.deleteCommentService(req, res);
  };
}

export default CommentController;
