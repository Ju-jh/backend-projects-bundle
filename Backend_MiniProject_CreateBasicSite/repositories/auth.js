import { Users } from "../models/auth.js";

class AuthRepository {
  createUser = async (nickname, password) => {
    return await Users.create({ nickname, password });
  };

  findByNickname = async (nickname) => {
    return await Users.findOne({ where: { nickname: nickname } });
  };
}

export default AuthRepository;
