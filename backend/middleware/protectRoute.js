import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({error: "Unothaurized - No Token Provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({error: "Unothaurized - Invalid Token"});

        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(404).json({error: "User not found"});
        }

        req.user = user; //add the user to the req
        next(); //call the next middleware
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({error: error.message}); //TODO make generic in prod
    }
}

export default protectRoute;