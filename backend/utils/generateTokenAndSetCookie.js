import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = ( userId,res) => {
	console.log(userId);
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "100d",
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "none",
		maxAge: 30*24*60*60*1000
	});

	return token;
};
