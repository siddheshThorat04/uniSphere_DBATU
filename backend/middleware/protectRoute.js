// const  User =require("../models/userModel.js")
// const  jwt =require("jsonwebtoken")
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Please login first" });
        }
        console.log("Token received:", token);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 🔍 DEBUGGING: Log decoded token
        console.log("Decoded Token:", decoded);

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        res.status(401).json({ error: "Error in protecting route", details: error.message });
    }
};

export default protectRoute