import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = ( userId,res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "100d",
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		expires: new Date("9999-12-31T23:59:59Z")
	});

	return token;
};
