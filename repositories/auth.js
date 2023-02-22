import { User } from "../models/auth.js";

class AuthRepository {
  createUser = async (nickname, password) => {
    return await User.create({ nickname, password });
  };

  findByUsername = async (nickname) => {
    return await User.findOne({ where: { nickname: nickname } });
  };
}

export default AuthRepository;
