import PostService from '../services/posts.js';

class PostController {
  postService = new PostService();

  createPostController = async (req, res) => {
    return await this.postService.createPostService(req, res);
  };

  getAllPostController = async (_, res) => {
    return await this.postService.getAllPostService(_, res);
  };

  getAllByIdPostController = async (req, res) => {
    return await this.postService.getDetailPostService(req, res);
  };

  updatePostController = async (req, res) => {
    return await this.postService.updatePostService(req, res);
  };

  deletePostController = async (req, res) => {
    return await this.postService.deletePostService(req, res);
  };
}

export default PostController;
