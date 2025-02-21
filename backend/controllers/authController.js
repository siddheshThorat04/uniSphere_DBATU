// import bcryptjs from "bcryptjs";
// import crypto from "crypto";

// import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
// import {
// 	sendPasswordResetEmail,
// 	sendResetSuccessEmail,
// 	sendVerificationEmail,
// 	sendWelcomeEmail,
// } from "../mailtrap/emails.js";
// import { User } from "../models/user.model.js";

// export const signup = async (req, res) => {
// 	const { email, password, name } = req.body;

// 	try {
// 		if (!email || !password || !name) {
// 			throw new Error("All fields are required");
// 		}

// 		const userAlreadyExists = await User.findOne({ email });
// 		console.log("userAlreadyExists", userAlreadyExists);

// 		if (userAlreadyExists) {
// 			return res.status(400).json({ success: false, message: "User already exists" });
// 		}

// 		const hashedPassword = await bcryptjs.hash(password, 10);
// 		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

// 		const user = new User({
// 			email,
// 			password: hashedPassword,
// 			name,
// 			verificationToken,
// 			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
// 		});

// 		await user.save();

// 		// jwt
// 		generateTokenAndSetCookie(res, user._id);

// 		await sendVerificationEmail(user.email, verificationToken);

// 		res.status(201).json({
// 			success: true,
// 			message: "User created successfully",
// 			user: {
// 				...user._doc,
// 				password: undefined,
// 			},
// 		});
// 	} catch (error) {
// 		res.status(400).json({ success: false, message: error.message });
// 	}
// };

// export const verifyEmail = async (req, res) => {
// 	const { code } = req.body;
// 	try {
// 		const user = await User.findOne({
// 			verificationToken: code,
// 			verificationTokenExpiresAt: { $gt: Date.now() },
// 		});

// 		if (!user) {
// 			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
// 		}

// 		user.isVerified = true;
// 		user.verificationToken = undefined;
// 		user.verificationTokenExpiresAt = undefined;
// 		await user.save();

// 		await sendWelcomeEmail(user.email, user.name);

// 		res.status(200).json({
// 			success: true,
// 			message: "Email verified successfully",
// 			user: {
// 				...user._doc,
// 				password: undefined,
// 			},
// 		});
// 	} catch (error) {
// 		console.log("error in verifyEmail ", error);
// 		res.status(500).json({ success: false, message: "Server error" });
// 	}
// };

// export const login = async (req, res) => {
// 	const { email, password } = req.body;
// 	try {
// 		const user = await User.findOne({ email });
// 		if (!user) {
// 			return res.status(400).json({ success: false, message: "Invalid credentials" });
// 		}
// 		const isPasswordValid = await bcryptjs.compare(password, user.password);
// 		if (!isPasswordValid) {
// 			return res.status(400).json({ success: false, message: "Invalid credentials" });
// 		}

// 		generateTokenAndSetCookie(res, user._id);

// 		user.lastLogin = new Date();
// 		await user.save();

// 		res.status(200).json({
// 			success: true,
// 			message: "Logged in successfully",
// 			user: {
// 				...user._doc,
// 				password: undefined,
// 			},
// 		});
// 	} catch (error) {
// 		console.log("Error in login ", error);
// 		res.status(400).json({ success: false, message: error.message });
// 	}
// };

// export const logout = async (req, res) => {
// 	res.clearCookie("token");
// 	res.status(200).json({ success: true, message: "Logged out successfully" });
// };

// export const forgotPassword = async (req, res) => {
// 	const { email } = req.body;
// 	try {
// 		const user = await User.findOne({ email });

// 		if (!user) {
// 			return res.status(400).json({ success: false, message: "User not found" });
// 		}

// 		// Generate reset token
// 		const resetToken = crypto.randomBytes(20).toString("hex");
// 		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

// 		user.resetPasswordToken = resetToken;
// 		user.resetPasswordExpiresAt = resetTokenExpiresAt;

// 		await user.save();

// 		// send email
// 		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

// 		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
// 	} catch (error) {
// 		console.log("Error in forgotPassword ", error);
// 		res.status(400).json({ success: false, message: error.message });
// 	}
// };

// export const resetPassword = async (req, res) => {
// 	try {
// 		const { token } = req.params;	
// 		const { password } = req.body;

// 		const user = await User.findOne({
// 			resetPasswordToken: token,
// 			resetPasswordExpiresAt: { $gt: Date.now() },
// 		});

// 		if (!user) {
// 			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
// 		}

// 		// update password
// 		const hashedPassword = await bcryptjs.hash(password, 10);

// 		user.password = hashedPassword;
// 		user.resetPasswordToken = undefined;
// 		user.resetPasswordExpiresAt = undefined;
// 		await user.save();

// 		await sendResetSuccessEmail(user.email);

// 		res.status(200).json({ success: true, message: "Password reset successful" });
// 	} catch (error) {
// 		console.log("Error in resetPassword ", error);
// 		res.status(400).json({ success: false, message: error.message });
// 	}
// };

// export const checkAuth = async (req, res) => {
// 	try {
// 		const user = await User.findById(req.userId).select("-password");
// 		if (!user) {
// 			return res.status(400).json({ success: false, message: "User not found" });
// 		}

// 		res.status(200).json({ success: true, user });
// 	} catch (error) {
// 		console.log("Error in checkAuth ", error);
// 		res.status(400).json({ success: false, message: error.message });
// 	}
// };



import User from "../models/userModel.js"
import  bcrypt from "bcryptjs"
import  {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js"
export const  signup =async (req,res)=>{
    try {
        const { username, password,college } = req.body
        if (password.length < 4) {
            return res.status(400).json({ error: "password must be at least 4 characters" })
        }
        
        if (!username || !password || !college) {
            return res.status(400).json({ error: "all fields are required" })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ error: "user already exists" })
        }
        
        const salt = await bcrypt.genSalt(10)
        
        const hashedPassword = await bcrypt.hash(password, salt)
        let isAdmin = false
        if(username === "Admin" || username === "siddhesh" ) {isAdmin = true}
        const newUser = new User({
            username, 
            password:hashedPassword,
            college,
            isAdmin
        })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            res.status(200).json({message:"signed up succefully ",user:newUser })
            
        }
    } catch (error) {
        
        res.status(400).json({error:error.message})
    }
}
export const login = async (req, res) => {
        try {
            const { username, password } = req.body
            if (!username || !password) {
                res.status(400).json({ error: "all fields are required" })
            }
            const user = await User.findOne({ username })

            if (!user) {
                return res.status(400).json({ error: "user not found" })
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            if (!isPasswordCorrect) {
                return res.status(400).json({ error: "wrong password" })
            }
            generateTokenAndSetCookie(user._id, res)
            res.status(200).json({message:"logged in successfully", user})
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }
export const logout = async (req, res) => {
    try {
        res.cookie("mateBatu", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: "none"    
        })
        res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        res.status(400).json("error in logging out", error.message)
    }

}