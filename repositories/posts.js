import {
  Posts,
  INCLUDE_USER,
  ORDER_DESC,
  DETAIL_USER,
} from "../models/posts.js";
import { Users } from "../models/auth.js";

class PostRepository {
  createPost = async (content, title, userId) => {
    return await Posts.create({ content, title, userUserId: userId });
  };
  getAllPost = async () => {
    return await Posts.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
  };
  findByNickname = async (nickname) => {
    return await Users.findOne({ where: { nickname: nickname } });
  };
  getByPostId = async (postId) => {
    return await Posts.findOne({
      where: { postId },
      ...DETAIL_USER,
    });
  };
  updatePost = async (postId, title, content) => {
    return await Posts.findByPk(postId, DETAIL_USER).then((post) => {
      (post.title = title), (post.content = content);
      return post.save();
    });
  };
  removePost = async (postId) => {
    return await Posts.findByPk(postId).then((post) => {
      post.destroy();
    });
  };
}
export default PostRepository;
