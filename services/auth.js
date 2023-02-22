import AuthRepository from "../repositories/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.SECRETKEY;
class AuthService {
  authRepository = new AuthRepository();

  createUserService = async (req, res) => {
    const { nickname, password, confirm } = req.body;
    const rex = /^[a-zA-Z0-9]{4,20}$/;
    const nicknameCheck = rex.test(nickname);
    if (!nicknameCheck) {
      return res
        .status(412)
        .json({ errorMessage: "닉네임의 형식이 일치하지 않습니다." });
    }
    if (password !== confirm) {
      return res
        .status(412)
        .json({ errorMessage: "패스워드가 일치하지 않습니다." });
    }
    if (password.search(nickname) > -1) {
      return res.status(412).json({
        errorMessage: "패스워드에 닉네임이 포함되어 있습니다.",
      });
    }
    const found = await this.authRepository.findByUsername(nickname);
    if (found != null) {
      return res.status(412).json({ errorMessage: "아이디가 중복입니다." });
    }
    await this.authRepository.createUser(nickname, password);
    return res.status(200).json({ message: "회원가입에 성공하셨습니다." });
  };

  loginUserService = async (req, res) => {
    const { nickname, password } = req.body;
    const user = await this.authRepository.findByUsername(nickname);
    if (!user) {
      return res
        .status(412)
        .json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
    }
    const isValidPassword = await user.password.includes(password);
    if (!isValidPassword) {
      return res
        .status(412)
        .json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
    }

    const crtoken = createJwtToken(user.userId, user.nickname);
    const rftoken = createRefreshToken();
    const slicetoken1 = crtoken.slice(0, 10);
    const slicetoken2 = crtoken
      .slice(10, 20)
      .replace(/^[a-z0-9_]{4,20}$/gi, "**********");
    const token = slicetoken1 + slicetoken2;
    res.cookie("Authorization", `Bearer ${crtoken}`);
    res.cookie("RefreshToken", `Bearer ${rftoken}`);
    res.json({ token: token });

    function createJwtToken(userId, nickname) {
      return jwt.sign({ userId, nickname }, secretKey);
    }

    function createRefreshToken() {
      return jwt.sign({}, secretKey, { expiresIn: "14d" });
    }
  };
}

export default AuthService;
