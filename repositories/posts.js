import {
  Posts,
  INCLUDE_USER,
  ORDER_DESC,
  DETAIL_USER,
} from "../models/posts.js";
import { User } from "../models/auth.js";

class PostRepository {
  postCreate = async (content, title, userId) => {
    return await Posts.create({ content, title, userUserId: userId });
  };
  getAll = async () => {
    return await Posts.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
  };
  findByUsername = async (nickname) => {
    return await User.findOne({ where: { nickname: nickname } });
  };
  getById = async (postId) => {
    return await Posts.findOne({
      where: { postId },
      ...DETAIL_USER,
    });
  };
  postUpdate = async (postId, title, content) => {
    return await Posts.findByPk(postId, DETAIL_USER).then((post) => {
      (post.title = title), (post.content = content);
      return post.save();
    });
  };
  postRemove = async (postId) => {
    return await Posts.findByPk(postId).then((post) => {
      post.destroy();
    });
  };
}
export default PostRepository;
