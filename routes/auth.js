import express from 'express';
import AuthController from '../controller/auth.js';
import * as validate from '../middleware/validator.js';
const router = express.Router();
const authController = new AuthController();

router.post('/signup', validate.validate, authController.signup);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

export default router;
