// const  User =require("../models/userModel.js")
// const  jwt =require("jsonwebtoken")
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
const protectRoute = async (req, res, next) => {

    try {

        const  token  = req.cookies.token

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId)

        if (!user) {

            return res.status(401).json({ error: "please login first" })

        }

        req.user = user

        next()

    } catch (error) {

        res.status(401).json({ error: "error in protecting route",details: error.message })

    }
}

export default protectRoute