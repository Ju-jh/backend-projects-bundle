import AuthService from '../services/auth.js';

class AuthController {
    authService = new AuthService();

    signup = async (req, res) => {
        return await this.authService.createUserService(req, res);
    };

    login = async (req, res) => {
        return await this.authService.loginUserService(req, res);
    };

    logout = async (req, res) => {
        return await this.authService.logoutUserService(req, res);
    };
}

export default AuthController;
