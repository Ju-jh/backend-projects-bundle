import PostService from "../services/posts.js";

class PostController {
  postService = new PostService();

  createPost = async (req, res) => {
    return await this.postService.createPostService(req, res);
  };

  getAllPost = async (_, res) => {
    return await this.postService.getAllPostService(_, res);
  };

  getAllByIdPost = async (req, res) => {
    return await this.postService.getDetailPostService(req, res);
  };

  updatePost = async (req, res) => {
    return await this.postService.updatePostService(req, res);
  };

  deletePost = async (req, res) => {
    return await this.postSelvice.deletePostService(req, res);
  };
}

export default PostController;
