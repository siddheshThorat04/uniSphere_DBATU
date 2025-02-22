// const  User =require("../models/userModel.js")
// const  jwt =require("jsonwebtoken")
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
// const protectRoute = async (req, res, next) => {

//     try {

//         const  token  = req.cookies.token

//         if (!token) {

//             return res.status(401).json({ error: "please login first" })

//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         const user = await User.findById(decoded.userId)

//         if (!user) {

//             return res.status(401).json({ error: "please login first" })

//         }

//         req.user = user

//         next()

//     } catch (error) {

//         res.status(401).json({ error: "error in protecting route",details: error.message })

//     }
// }

// export default protectRoute
// const protectRoute = async (req, res, next) => {
//     try {
//         console.log("Cookies:", req.cookies); // Debugging
        
//         const token = req.cookies.token;

//         if (!token) {
//             return res.status(401).json({ error: "Please login first" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if(decoded){
//             console.log(decoded)
//         }
//         const user = await User.findById(decoded.userId);
//         console.log(user)

//         if (!user) {
//             return res.status(401).json({ error: "Please login first" });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         res.status(401).json({ error: "Error in protecting route", details: error.message });
//     }
// };
const protectRoute = async (req, res, next) => {
    try {
        console.log("Headers:", req.headers); // Log headers
        console.log("Cookies:", req.cookies); // Log cookies

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Please login first" });
        }

        // 🔍 DEBUGGING: Log before verifying
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