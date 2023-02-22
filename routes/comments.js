import express from "express";
import CommentController from "../controller/comments.js";
import AuthClass from "../middleware/auth.js";
const commentController = new CommentController();
const router = express.Router();
const authClass = new AuthClass();

router.post("/comments", authClass.isAuth, commentController.createComment);

router.get("/comments", commentController.getAllComment);

router.put(
  "/comments/:commentId",
  authClass.isAuth,
  commentController.updateComment
);

router.delete(
  "/comments/:commentId",
  authClass.isAuth,
  commentController.deleteComment
);

export default router;
