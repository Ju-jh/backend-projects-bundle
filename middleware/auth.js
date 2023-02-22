import jwt from "jsonwebtoken";
import { User } from "../models/auth.js";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.SECRETKEY;
class AuthClass {
  isAuth = async (req, res, next) => {
    const { Authorization, RefreshToken } = req.cookies;
    const [authType, authToken] = (Authorization ?? "").split(" ");

    if (!RefreshToken)
      return res
        .status(400)
        .json({ message: "Refresh Token이 존재하지 않습니다." });
    if (!Authorization)
      return res
        .status(400)
        .json({ message: "Access Token이 존재하지 않습니다." });

    const isAccessTokenValidate = this.validateAccessToken(Authorization);
    const isRefreshTokenValidate = this.validateRefreshToken(RefreshToken);

    if (isRefreshTokenValidate)
      return res
        .status(419)
        .json({ message: "Refresh Token이 만료되었습니다." });

    if (isAccessTokenValidate) {
      const accessTokenId = Object[RefreshToken];
      if (!accessTokenId)
        return res.status(419).json({
          message: "Refresh Token의 정보가 서버에 존재하지 않습니다.",
        });

      const newAccessToken = createAccessToken(accessTokenId);
      res.cookie("Authorization", newAccessToken);
      return res.json({ message: "Access Token을 새롭게 발급하였습니다." });
    }

    if (!authToken || authType !== "Bearer") {
      return res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
      });
    }

    const check = jwt.verify(authToken, secretKey);
    if (!check) {
      return res
        .status(403)
        .json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
    }

    const decodedToken = jwt.decode(authToken);
    const test = await User.findByPk(decodedToken.userId);
    if (test == null) {
      return res
        .status(403)
        .json({ errorMessage: "계정이 존재하지 않습니다." });
    }
    next();
  };

  validateAccessToken = (Authorization) => {
    try {
      jwt.verify(Authorization, secretKey);
      return true;
    } catch (error) {
      return false;
    }
  };

  validateRefreshToken = (RefreshToken) => {
    try {
      jwt.verify(RefreshToken, secretKey);
      return true;
    } catch (error) {
      return false;
    }
  };
}

export default AuthClass;
