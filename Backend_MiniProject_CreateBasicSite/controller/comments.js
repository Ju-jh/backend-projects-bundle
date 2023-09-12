import CommentService from "../services/comments.js";

class CommentController {
  commentService = new CommentService();

  createCommentController = async (req, res) => {
    return await this.commentService.createCommentService(req, res);
  };

  getAllCommentController = async (_, res) => {
    return await this.commentService.getAllCommentService(_, res);
  };

  updateCommentController = async (req, res) => {
    return await this.commentService.updateCommentService(req, res);
  };

  deleteCommentController = async (req, res) => {
    return await this.commentService.deleteCommentService(req, res);
  };
}

export default CommentController;
