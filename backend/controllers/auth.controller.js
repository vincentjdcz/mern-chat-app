import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
      const {fullName, username, password, confirmPassword, gender}= req.body;
      
      if(password !== confirmPassword) {
        return res.status(400).json({error: "Passwords don't match"});
      }

      const user = await User.findOne({username}); //check if username already exists

      if(user) {
        return res.status(400).json({error: "Username already exists"});
      }

      //HASH PW HERE
      const salt = await bcrypt.genSalt(10); //create a salt used for hashing the password
      const hashedPassword = await bcrypt.hash(password, salt); //create hashed password

      //generate random profile pic using this api
      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
    
      const newUser = new User({
        fullName,
        username,
        password:hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic

      }); //create a new User document object

      if(newUser) {
        // Generate JWT Token here
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save(); //save the User document to the database
        
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic
        });
      } else {
        res.status(400).json({error: "Invalid user data"});
      }
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({error:error.message}); //TODO: in prod, replace error.message with just "Internal Server Error"
    }
};

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); //we use user? and || "" in case user does not exist 

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in login controller: ", error.message)
        res.status(500).json({error:error.message}); //TODO: in prod, replace error.message with just "Internal Server Error"

    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        }); //clear the cookie
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller: ", error.message)
        res.status(500).json({error:error.message}); //TODO: in prod, replace error.message with just "Internal Server Error"

    }
}
