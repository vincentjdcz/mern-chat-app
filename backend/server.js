import path from "path";
import express from "express"; //we use import syntax because in package.json we have "type":"module"
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.routes.js" //I believe we can call it "authRoutes" without having to use "as" to rename because there is an export default in auth.routes.js meaning there is one thing being exported by default
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); //If no path segments are passed, path.resolve() will return the absolute path of the current working directory - The current working directory (CWD) in Node.js is the directory from which you launched the Node.js process.

dotenv.config();// reads the .env file, parses it, and sets the specified environment variables on process.env. This allows you to access these variables throughout your application.

app.use(express.json());//parse and allow us to read json from req.body
app.use(cookieParser()); //allows us to access the cookies via req.cookies
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

console.log("__dirname: ", __dirname);
console.log("path.join: ", path.join(__dirname, "/frontend/dist"));
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

/*
app.get("/", (req, res) => {
    //root route http://localhost:5000/
    res.send("Hello World!!");
})*/


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
}); // creates an http server object and then configures it to receive incoming TCP connections on a specific port and IP address

/*
Notes: path.resolve()

In this code snippet, __dirname is being assigned the value of the resolved absolute path of the current working directory. This is achieved using the path.resolve() function from the Node.js path module.

Here's what each part does:

path.resolve(): This function resolves a sequence of paths or path segments into an absolute path. When called without any arguments, it resolves to the absolute path of the current working directory.

const __dirname = ...: This line declares a constant variable named __dirname. The use of const ensures that __dirname cannot be reassigned to a different value later in the code.

By assigning the result of path.resolve() to __dirname, the code obtains the absolute path of the directory containing the current script file

============================================================================================

Note: app.use(express.static(path.join(__dirname, "/frontend/dist")));


This code sets up Express middleware to serve static files from a directory named "frontend/dist" relative to the current working directory.

Here's what each part does:

express.static: This is a built-in middleware function in Express. It serves static files such as images, CSS files, JavaScript files, etc., from the specified directory. When a request is made for a static file, Express will look in the specified directory to serve the file if it exists.

path.join(__dirname, "/frontend/dist"): This uses the path.join() function to concatenate the current directory (__dirname) with the relative path "/frontend/dist". __dirname refers to the directory of the current module (file), and it ensures that the path is constructed correctly regardless of the operating system's file path conventions.

app.use(...): This is how middleware is added to an Express application. It mounts the static file-serving middleware at the specified route ("/" in this case). This means that any requests for static files will be served from the directory specified by express.static(path.join(__dirname, "/frontend/dist")).

In summary, this code configures Express to serve static files from the "frontend/dist" directory, allowing clients to access resources like HTML, CSS, JavaScript, images, etc., stored in that directory.



User
how do you know that the route is /
ChatGPT
You're correct, I made an assumption based on common usage, but the route is not explicitly specified in the code snippet. Typically, when mounting static file-serving middleware using app.use(express.static(...)), it defaults to serving files from the root ("/") of the server. However, this behavior can be modified by specifying a different route as the first argument to app.use().

So, if the intention is to serve static files from the root of the server, the route would indeed be "/", but if a different route is desired, it should be explicitly specified. Thank you for pointing out the oversight!

============================================================================================

Note: app.get("*", ... );

This code defines a route handler for all HTTP GET requests that do not match any other route handler in the Express application. The * in app.get("*", ...) is a wildcard route that matches any URL.

The route handler function (req, res) => {...} sends the index.html file located in the frontend/dist directory as a response to the client for any request that matches this wildcard route.

Here's a breakdown of the code:

app.get("*", ...) registers a route handler for all HTTP GET requests that do not match any other route handlers. The * acts as a wildcard to match any path.

The route handler function (req, res) => {...} takes two arguments: req (the request object) and res (the response object).

res.sendFile() is an Express method used to send a file in the response. It takes the path to the file as an argument.

path.join(__dirname, "frontend", "dist", "index.html") constructs the absolute path to the index.html file in the frontend/dist directory. __dirname is a Node.js global variable that represents the directory of the currently executing script.

So, when a request is made to any URL that doesn't match an explicitly defined route (e.g., /, /about, /contact, etc.), this route handler will respond by serving the index.html file from the frontend/dist directory. This is a common setup for single-page applications (SPAs) where the client-side routing is handled by JavaScript on the client side, and the server serves the same HTML file for all routes to allow the client-side routing to take over.

User
do you need to put this route last? if you put it first, will it prevent other routes from being hit?
ChatGPT
Yes, the order of route handlers in Express matters. Routes are evaluated in the order they are defined, and Express will execute the first matching route handler it encounters.

If you put the wildcard route handler (app.get("*", ...)) first before other route handlers, it will match all GET requests, effectively acting as a catch-all route. As a result, requests to other specific routes will also match this wildcard route, and the corresponding route handlers for those specific routes won't be executed.

To ensure that specific routes are matched before the wildcard route handler, you should define the more specific routes first and then the wildcard route handler last. This way, Express will attempt to match the specific routes first, and if none of them match, it will fall back to the wildcard route handler as the catch-all.





*/