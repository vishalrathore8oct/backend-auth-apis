import express from "express";
import { userRegisterValidator, verifyEmailValidator, resendVerificationCodeValidator, userLoginValidator, forgotPasswordValidator, resetPasswordValidator } from "../validators/user.validators.js";
import { validateRequest } from "../middlewares/validator.middlewares.js";
import { registerUser, verifyEmail, resendVerificationCode, loginUser, logoutUser, getUser, forgotPassword, resetPassword, googleLogin, googleCallback } from "../controllers/auth.controllers.js";
import { isLoggedIn } from "../middlewares/authenticate.middlewares.js";
import { ApiError } from "../utils/ApiError.js";

const router = express.Router();

router.post("/register", userRegisterValidator(), validateRequest, registerUser)
router.post("/verifyEmail", verifyEmailValidator(), validateRequest, verifyEmail)
router.post("/resendVerificationCode", resendVerificationCodeValidator(), validateRequest, resendVerificationCode)
router.post("/login", userLoginValidator(), validateRequest, loginUser)
router.post("/logout", isLoggedIn, logoutUser)
router.post("/getUser", isLoggedIn, getUser)
router.post("/forgotPassword", forgotPasswordValidator(), validateRequest, forgotPassword)
router.post("/resetPassword", (req, res, next) => next(new ApiError(400, "Reset token is required in the URL.")));
router.post("/resetPassword/:resetToken", resetPasswordValidator(), validateRequest, resetPassword)
router.get("/googleLogin", googleLogin)
router.get("/googleCallback", googleCallback)


export default router;