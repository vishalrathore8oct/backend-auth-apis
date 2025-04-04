import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        const refreshToken = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!accessToken && !refreshToken) {
            return next(new ApiError(401, "Unauthorized! No token provided."));
        }

        if (accessToken) {
            try {
                const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
                const user = await User.findById(decodedAccessToken.id).select("-password");

                if (!user) {
                    return next(new ApiError(401, "Unauthorized! User not found."));
                }

                req.user = user;
                return next();

            } catch (error) {
                if (error.name === "TokenExpiredError") {
                    console.log("Access token expired, checking refresh token...");
                } else if (error.name === "JsonWebTokenError") {
                    return next(new ApiError(401, "Unauthorized! Invalid access token."));
                } else {
                    return next(error);
                }
            }
        }

        if (refreshToken) {
            try {
                const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const user = await User.findById(decodedRefreshToken.id).select("-password");

                if (!user) {
                    return next(new ApiError(403, "Forbidden! User not found."));
                }

                if (!user.refreshToken || user.refreshToken !== refreshToken) {
                    return next(new ApiError(403, "Forbidden! Invalid refresh token."));
                }

                const newAccessToken = await user.generateAccessToken();
                const newRefreshToken = await user.generateRefreshToken();

                user.refreshToken = newRefreshToken;
                await user.save();

                const cookieOptions = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                };

                res.cookie("accessToken", newAccessToken, {
                    ...cookieOptions,
                    maxAge: 24 * 60 * 60 * 1000,
                });

                res.cookie("refreshToken", newRefreshToken, {
                    ...cookieOptions,
                    maxAge: 10 * 24 * 60 * 60 * 1000,
                });

                req.user = user;
                return next();

            } catch (error) {
                if (error.name === "TokenExpiredError") {
                    return next(new ApiError(401, "Unauthorized! Refresh token expired."));
                } else if (error.name === "JsonWebTokenError") {
                    return next(new ApiError(403, "Forbidden! Invalid refresh token."));
                } else {
                    return next(error);
                }
            }
        }

    } catch (error) {
        return next(error);
    }
};

export { isLoggedIn };
