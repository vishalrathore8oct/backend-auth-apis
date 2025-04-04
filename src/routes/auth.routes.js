import express from "express";
import { userRegisterValidator, verifyEmailValidator, resendVerificationCodeValidator } from "../validators/user.validators.js";
import { validateRequest } from "../middlewares/validator.middlewares.js";
import { registerUser, verifyEmail, resendVerificationCode } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", userRegisterValidator(), validateRequest, registerUser)
router.post("/verifyEmail", verifyEmailValidator(), validateRequest, verifyEmail)
router.post("/resendVerificationCode", resendVerificationCodeValidator(), validateRequest, resendVerificationCode)

export default router;