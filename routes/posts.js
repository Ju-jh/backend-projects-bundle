import express from "express";
import PostController from "../controller/posts.js";
import AuthClass from "../middleware/auth.js";
const postController = new PostController();
const router = express.Router();
const authClass = new AuthClass();

router.post("/", authClass.isAuth, postController.createPost);

router.get("/", postController.getAllPost);

router.get("/:postId", postController.getAllByIdPost);

router.put("/:postId", authClass.isAuth, postController.updatePost);

router.delete("/:postId", authClass.isAuth, postController.deletePost);

export default router;
