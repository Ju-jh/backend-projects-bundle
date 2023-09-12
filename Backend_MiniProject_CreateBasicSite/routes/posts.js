import express from 'express';
import PostController from '../controller/posts.js';
import AuthClass from '../middleware/auth.js';
const postController = new PostController();
const router = express.Router();
const authClass = new AuthClass();

router.post('/', authClass.isAuth, postController.createPostController);

router.get('/', postController.getAllPostController);

router.get('/:postId', postController.getAllByIdPostController);

router.put('/:postId', authClass.isAuth, postController.updatePostController);

router.delete(
  '/:postId',
  authClass.isAuth,
  postController.deletePostController
);

export default router;
