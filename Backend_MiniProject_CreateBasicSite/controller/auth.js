import AuthService from "../services/auth.js";

class AuthController {
  authService = new AuthService();

  signupController = async (req, res) => {
    return await this.authService.createUserService(req, res);
  };

  loginController = async (req, res) => {
    return await this.authService.loginUserService(req, res);
  };

  logoutController = async (_, res) => {
    return await this.authService.logoutUserService(_, res);
  };
}

export default AuthController;
