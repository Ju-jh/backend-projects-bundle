import { Likes } from "../models/likes.js";
import { Posts, LIKE_COUNT } from "../models/posts.js";

class LikeRepository {
  likeGetAll = async () => {
    return await Posts.findAll({ ...LIKE_COUNT, group: "postId" });
  };

  likeSearch = async (postId) => {
    return await Posts.findByPk(postId);
  };

  likeCheck = async (postId, userId) => {
    return await Likes.findOne({
      where: { postPostId: postId, userUserId: userId },
    });
  };

  likeCreate = async (postId, userId) => {
    return await Likes.create({ postPostId: postId, userUserId: userId });
  };

  likeDelete = async (postId, userId) => {
    return await Likes.destroy({
      where: { postPostId: postId, userUserId: userId },
    });
  };
}

export default LikeRepository;
