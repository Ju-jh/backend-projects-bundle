import LikeService from "../services/likes.js";

class LikeController {
  likeService = new LikeService();

  getAllLikeController = async (_, res) => {
    return await this.likeService.getAllLikeService(_, res);
  };

  updateLikeController = async (req, res) => {
    return await this.likeService.updateLikeService(req, res);
  };
}

export default LikeController;
