import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { emailTemplateForResetPasswordUrl, emailTemplateForVerificationCode } from "../utils/emailTemplates.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import crypto from "crypto";


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, fullName } = req.body;

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new ApiError(400, "User Already Exist With This Email!")
    }


    const user = await User.create({
        username,
        email,
        password,
        fullName,
    })


    if (!user) {
        throw new ApiError(400, "User Registration Failed!")
    }

    const verificationCode = await user.generateEmailVerificationCode()

    await user.save()

    const message = emailTemplateForVerificationCode(verificationCode)

    await sendVerificationEmail(email, "Your Account Verification Code", message)

    const userData = await User.findById(user._id).select("-password -refreshToken")

    res.status(201).json(new ApiResponse(201, "User Registered Successfully and Verification code successfully sent to Registered Email", userData))

})

const verifyEmail = asyncHandler(async (req, res) => {

    const { verificationCode } = req.body;

    const user = await User.findOne({ emailVerificationCode: verificationCode })

    if (!user) {
        throw new ApiError(400, "Invalid Verification Code")
    }

    const currentTime = new Date(Date.now());

    if (currentTime > user.emailVerificationCodeExpires) {
        throw new ApiError(400, "Verification Code Expired")
    }

    user.isEmailVerified = true
    user.emailVerificationCode = undefined
    user.emailVerificationCodeExpires = undefined
    await user.save();

    const userData = await User.findById(user._id).select("-password -refreshToken")

    res.status(200).json(new ApiResponse(200, "Email verified successfully", userData))

})

const resendVerificationCode = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isEmailVerified) {
        throw new ApiError(400, "Email is already verified");
    }

    const verificationCode = await user.generateEmailVerificationCode()

    await user.save();

    const message = emailTemplateForVerificationCode(verificationCode)

    await sendVerificationEmail(email, "New verification code", message)

    const userData = await User.findById(user._id).select("-password -refreshToken")

    res.status(200).json(new ApiResponse(200, "New verification code sent successfully", userData));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found. Please sign up.");
    }

    if (!user.isEmailVerified) {
        throw new ApiError(400, "Email not verified. Please verify your email before logging in.");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);

    if (!isPasswordMatch) {
        throw new ApiError(400, "Invalid email or password. Please try again.");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 10 * 24 * 60 * 60 * 1000
    });

    const userData = await User.findById(user._id).select("-password -refreshToken");

    res.status(200).json(new ApiResponse(200, "User logged in successfully", { user: userData, accessToken, refreshToken }));

});

const logoutUser = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized! User not authenticated.");
    }
    const user = await User.findByIdAndUpdate(userId, { $unset: { refreshToken: "" } }, { new: true });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    res.status(200).json(new ApiResponse(200, "User logged out successfully"));

});

const getUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized! User not authenticated.");
    }

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, "User retrieved successfully", user));
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email, isEmailVerified: true });

    if (!user) {
        throw new ApiError(404, "User not found or email not verified");
    }

    const resetToken = await user.generateResetPasswordToken();

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/resetPassword/${resetToken}`;

    await user.save();

    const message = emailTemplateForResetPasswordUrl(resetPasswordUrl);

    await sendVerificationEmail(email, "Your Reset Password URL", message);

    const userData = await User.findById(user._id).select("-password -refreshToken");

    res.status(200).json(new ApiResponse(200, "Reset password URL sent successfully to your registered Email", userData));
});

const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const user = await User.findOne({ resetPasswordToken: hashedResetToken });

    if (!user) {
        throw new ApiError(400, "invalid reset token");
    }

    const currentTime = new Date(Date.now());
    if (currentTime > user.resetPasswordTokenExpires) {
        throw new ApiError(400, "Reset token expired");
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    await user.save();

    const userData = await User.findById(user._id).select("-password -refreshToken");

    res.status(200).json(new ApiResponse(200, "Password reset successfully", userData));

});


export { registerUser, verifyEmail, resendVerificationCode, loginUser, logoutUser, getUser, forgotPassword, resetPassword }