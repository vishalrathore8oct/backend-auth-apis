import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";


const userSchema = new mongoose.Schema({
    avatar: {
        type: {
            url: String,
            localPath: String,
        },
        default: {
            url: "https://i.pravatar.cc/150",
            localPath: "",
        },
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationToken: {
        type: String,
    },
    emailVerificationTokenExpires: {
        type: Date,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpires: {
        type: Date,
    },
    refreshToken: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
}

userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");
    const tokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    return { unHashedToken, hashedToken, tokenExpiry, };
}

export const User = mongoose.model("User", userSchema);

