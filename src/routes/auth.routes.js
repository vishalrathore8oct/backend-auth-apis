import express from "express";
import { userRegisterValidator, verifyEmailValidator, resendVerificationCodeValidator, userLoginValidator } from "../validators/user.validators.js";
import { validateRequest } from "../middlewares/validator.middlewares.js";
import { registerUser, verifyEmail, resendVerificationCode, loginUser, logoutUser, getUser } from "../controllers/auth.controllers.js";
import { isLoggedIn } from "../middlewares/authenticate.middlewares.js";

const router = express.Router();

router.post("/register", userRegisterValidator(), validateRequest, registerUser)
router.post("/verifyEmail", verifyEmailValidator(), validateRequest, verifyEmail)
router.post("/resendVerificationCode", resendVerificationCodeValidator(), validateRequest, resendVerificationCode)
router.post("/login", userLoginValidator(), validateRequest, loginUser)
router.post("/logout",isLoggedIn, logoutUser)
router.post("/getUser",isLoggedIn, getUser)


export default router;