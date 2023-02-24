import PostRepository from '../repositories/posts.js';
import jwt from 'jsonwebtoken';

class PostService {
  postRepository = new PostRepository();

  createPostService = async (req, res) => {
    const { title, content } = req.body;
    const token = req.cookies.Authorization;
    const splitedToken = token.split(' ')[1];
    const decodedToken = jwt.decode(splitedToken);
    await this.postRepository.createPost(title, content, decodedToken.userId);
    return res.status(201).json({ message: '게시글 작성에 성공하였습니다.' });
  };

  getAllPostService = async (_, res) => {
    const isFindPostData = await this.postRepository.getAllPost();
    return res.status(200).json({ post: isFindPostData });
  };

  getDetailPostService = async (req, res) => {
    const { postId } = req.params;
    const isFindPostId = await this.postRepository.findByNickname(postId);
    if (isFindPostId !== null) {
      return res.status(200).json({ post: isFindPostId });
    } else {
      return res
        .status(404)
        .json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  };

  updatePostService = async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    const token = req.cookies.Authorization;
    const splitedToken = token.split(' ')[1];
    const decodedToken = jwt.decode(splitedToken);
    const isUpdateFindPostId = await this.postRepository.getByPostId(postId);
    if (!isUpdateFindPostId) {
      return res
        .status(404)
        .json({ errorMessage: '게시글 번호가 존재하지 않습니다.' });
    }
    if (isUpdateFindPostId.dataValues.userId != decodedToken.userId) {
      return res
        .status(403)
        .json({ errorMessage: '로그인이 필요한 기능입니다.' });
    }
    await this.postRepository.updatePost(postId, title, content);
    return res.status(200).json({ message: '게시글을 수정하였습니다.' });
  };

  deletePostService = async (req, res) => {
    const { postId } = req.params;
    const token = req.cookies.Authorization;
    const splitedToken = token.split(' ')[1];
    const decodedToken = jwt.decode(splitedToken);
    const isDeleteFindPostId = await this.postRepository.getByPostId(postId);
    if (!isDeleteFindPostId) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }
    if (isDeleteFindPostId.dataValues.userId != decodedToken.userId) {
      return res
        .status(403)
        .json({ errorMessage: '로그인이 필요한 기능입니다.' });
    }
    await this.postRepository.removePost(postId);
    return res.status(200).json({ message: '게시글을 삭제하였습니다.' });
  };
}

export default PostService;
