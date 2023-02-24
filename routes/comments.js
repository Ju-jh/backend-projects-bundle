import express from "express";
import CommentController from "../controller/comments.js";
import AuthClass from "../middleware/auth.js";
const commentController = new CommentController();
const router = express.Router();
const authClass = new AuthClass();

router.post(
  "/comments",
  authClass.isAuth,
  commentController.createCommentController
);

router.get("/comments", commentController.getAllCommentController);

router.put(
  "/comments/:commentId",
  authClass.isAuth,
  commentController.updateCommentController
);

router.delete(
  "/comments/:commentId",
  authClass.isAuth,
  commentController.deleteCommentController
);

export default router;
