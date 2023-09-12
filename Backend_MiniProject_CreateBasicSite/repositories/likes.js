import { Likes } from "../models/likes.js";
import { Posts, LIKE_COUNT } from "../models/posts.js";

class LikeRepository {
  getAllLike = async () => {
    return await Posts.findAll({ ...LIKE_COUNT, group: "postId" });
  };

  searchLike = async (postId) => {
    return await Posts.findByPk(postId);
  };

  checkLike = async (postId, userId) => {
    return await Likes.findOne({
      where: { postPostId: postId, userUserId: userId },
    });
  };

  createLike = async (postId, userId) => {
    return await Likes.create({ postPostId: postId, userUserId: userId });
  };

  deleteLike = async (postId, userId) => {
    return await Likes.destroy({
      where: { postPostId: postId, userUserId: userId },
    });
  };
}

export default LikeRepository;
