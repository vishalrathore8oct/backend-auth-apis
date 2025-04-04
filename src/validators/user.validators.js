import { body, param } from "express-validator";

export const userRegisterValidator = () => {
    return [
        body("username")
            .trim()
            .notEmpty().withMessage("Username is reqregisteruired")
            .isLength({ min: 3, max: 13 }).withMessage("Username must be between 3 and 13 characters")
            .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores"),

        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Invalid email format"),

        body("password")
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
            .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
            .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
            .matches(/[0-9]/).withMessage("Password must contain at least one number")
            .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character"),

        body("fullName")
            .trim()
            .notEmpty().withMessage("Full name is required")
            .isLength({ min: 3, max: 15 }).withMessage("Full name must be between 3 and 15 characters"),
    ];
};

export const userLoginValidator = () => {
    return [
        body("email")
            .trim()
            .isEmail().withMessage("Please enter a valid email address")
            .notEmpty().withMessage("Email is required"),

        body("password")
            .trim()
            .notEmpty().withMessage("Password is required"),
    ];
};

export const verifyEmailValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Invalid email format"),
        body("verificationCode")
            .trim()
            .notEmpty().withMessage("verificationCode is required")
    ];
}

export const resendVerificationCodeValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Invalid email format"),
    ];
}

export const forgotPasswordValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Invalid email format"),
    ];
}

export const resetPasswordValidator = () => {
    return [
        body("password")
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
            .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
            .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
            .matches(/[0-9]/).withMessage("Password must contain at least one number")
            .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character"),
        body("confirmPassword")
            .trim()
            .notEmpty().withMessage("Confirm password is required")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match");
                }
                return true;
            }),
    ];
}