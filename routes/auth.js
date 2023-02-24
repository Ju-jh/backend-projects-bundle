import express from "express";
import AuthController from "../controller/auth.js";
import * as validate from "../middleware/validator.js";
const router = express.Router();
const authController = new AuthController();

router.post("/signup", validate.validate, authController.signupController);

router.post("/login", authController.loginController);

router.post("/logout", authController.logoutController);

export default router;
