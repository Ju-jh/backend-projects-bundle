import PostRepository from "../repositories/posts.js";
import jwt from "jsonwebtoken";

class PostService {
  postRepository = new PostRepository();

  createPostService = async (req, res) => {
    const { title, content } = req.body;
    const token = req.cookies.Authorization;
    const splitedToken = token.split(" ")[1];
    const decodedToken = jwt.decode(splitedToken);
    await this.postRepository.postCreate(title, content, decodedToken.userId);
    return res.status(201).json({ message: "게시글 작성에 성공하였습니다." });
  };

  getAllPostService = async (_, res) => {
    const data = await this.postRepository.getAll();
    return res.status(200).json({ post: data });
  };

  getDetailPostService = async (req, res) => {
    const { postId } = req.params;
    const findId = await this.postRepository.getById(postId);
    if (findId !== null) {
      return res.status(200).json({ post: findId });
    } else {
      return res
        .status(404)
        .json({ errorMessage: "게시글 조회에 실패하였습니다." });
    }
  };

  updatePostService = async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    const token = req.cookies.Authorization;
    const splitedToken = token.split(" ")[1];
    const decodedToken = jwt.decode(splitedToken);
    const updatefind = await this.postRepository.getById(postId);
    if (!updatefind) {
      return res
        .status(404)
        .json({ errorMessage: "게시글 번호가 존재하지 않습니다." });
    }
    if (updatefind.dataValues.userId != decodedToken.userId) {
      return res
        .status(403)
        .json({ errorMessage: "로그인이 필요한 기능입니다." });
    }
    await this.postRepository.postUpdate(postId, title, content);
    return res.status(200).json({ message: "게시글을 수정하였습니다." });
  };

  deletePostService = async (req, res) => {
    const { postId } = req.params;
    const token = req.cookies.Authorization;
    const splitedToken = token.split(" ")[1];
    const decodedToken = jwt.decode(splitedToken);
    const deletefind = await this.postRepository.getById(postId);
    if (!deletefind) {
      return res
        .status(404)
        .json({ errorMessage: "게시글이 존재하지 않습니다." });
    }
    if (deletefind.dataValues.userId != decodedToken.userId) {
      return res
        .status(403)
        .json({ errorMessage: "로그인이 필요한 기능입니다." });
    }
    await this.postRepository.postRemove(postId);
    return res.status(200).json({ message: "게시글을 삭제하였습니다." });
  };
}

export default PostService;
