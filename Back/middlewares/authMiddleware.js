import jwt from "jsonwebtoken";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// ✅ Middleware to verify JWT token and populate req.user
export const protect = asyncHandler(async (req, res, next) => {
    console.log("Protect middleware invoked:", req.headers.authorization);

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        try {
            // ✅ Extract token
            token = req.headers.authorization.split(" ")[1];

            // ✅ Verify token
            const decoded = jwt.verify(token, "random456");

            // ✅ Get user from database and attach to request
            req.user = await User.findOne({ email: decoded.email }).select(
                "-password"
            );

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            // ✅ Check if user account is disabled or deleted
            if (req.user.isDisabled || req.user.isDeleted) {
                return res.status(401).json({ message: "Account is disabled or deleted" });
            }

            next();
        } catch (error) {
            console.error("JWT verification failed:", error.message);
            return res.status(401).json({ message: "Invalid token" });
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

// ✅ Middleware to check if user is admin
export const adminOnly = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ 
            message: "Access denied. Admin privileges required." 
        });
    }

    next();
});

// ✅ Combined middleware for admin-protected routes
export const adminProtect = [protect, adminOnly];
