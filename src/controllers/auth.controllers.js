import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { emailTemplateForVerificationCode } from "../utils/emailTemplates.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";


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

    const { email, verificationCode} = req.body;

    const user = await User.findOne({ email, isEmailVerified: false })

    if (!user) {
        throw new ApiError(400, "User not found")
    }
    
    if (user.emailVerificationCode !== Number(verificationCode)) {
        throw new ApiError(400, "Invalid Verification Code")
    }

    const currentTime = new Date(Date.now());

    console.log(currentTime.toLocaleString(), user.emailVerificationCodeExpires.toLocaleString());
    
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


export { registerUser, verifyEmail, resendVerificationCode }