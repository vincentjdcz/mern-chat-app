import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    }) //creates jwt token

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days denoted in milliseconds
        httpOnly: true, //prevent this cookie being accessed by javascript
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development" 
    }) //set jwt as a cookie
}

export default generateTokenAndSetCookie;