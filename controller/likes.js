import LikeService from "../services/likes.js";

class LikeController {
  likeService = new LikeService();

  getAllLike = async (_, res) => {
    return await this.likeService.getAllLikeService(_, res);
  };

  updateLike = async (req, res) => {
    return await this.likeService.updateLikeService(req, res);
  };
}

export default LikeController;
