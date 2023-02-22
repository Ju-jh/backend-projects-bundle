import { validationResult } from "express-validator";
import { body } from "express-validator";

//닉네임 패스워드 검사
const validateCredential = [
  body("nickname")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("nickname should be at least 3 characters"),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("password should be at least 4 characters"),
];

//기본 유효성 검사
export const validate = (req, res, next) => {
  validateCredential;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};
