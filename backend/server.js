import express from "express"; //we use import syntax because in package.json we have "type":"module"
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.routes.js" //I believe we can call it "authRoutes" without having to use "as" to rename because there is an export default in auth.routes.js meaning there is one thing being exported by default
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();// reads the .env file, parses it, and sets the specified environment variables on process.env. This allows you to access these variables throughout your application.

app.use(express.json());//parse and allow us to read json from req.body
app.use(cookieParser()); //allows us to access the cookies via req.cookies
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

/*
app.get("/", (req, res) => {
    //root route http://localhost:5000/
    res.send("Hello World!!");
})*/



app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
}); // creates an http server object and then configures it to receive incoming TCP connections on a specific port and IP address