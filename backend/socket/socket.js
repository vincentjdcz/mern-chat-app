import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET", "POST"]
    }
});

export const getReceiverSocketId = (receiverId) => { //return the socketId of the user to which a message is being sent (represneted here by receiverId)
  return userSocketMap[receiverId]; 
}

const userSocketMap = {}; //userId: socketId

io.on("connection", (socket) => {
    console.log("a user connected: ", socket.id );

    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId] = socket.id; //map the authenticated user to the socket.id of the socket for this connection
    
    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //send updated list of connected users to everyone online
    
    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});
export {app, io, server}

/*
 Note:

 Certainly! This code sets up a basic Express server with Socket.IO integration.

express: This imports the Express library, which is a web framework for Node.js. Express simplifies the process of building web applications and APIs by providing a range of utilities and middleware.

http: This imports the built-in Node.js http module, which provides functionality for creating HTTP servers and handling HTTP requests and responses.

socket.io: This imports the Socket.IO library, which enables real-time bidirectional communication between web clients and servers. It's commonly used for building chat applications, multiplayer games, and other real-time web applications.

app: This creates an instance of the Express application.

server: This creates an HTTP server using the http.createServer() method, passing in the Express application (app) as a handler. This allows Express to handle HTTP requests and responses.

io: This creates a new instance of the Socket.IO Server class, passing in the HTTP server (server) as an argument. This initializes Socket.IO on the server-side. The cors option is used to configure Cross-Origin Resource Sharing (CORS) settings. In this case, it allows requests from http://localhost:3000, assuming that's where your client-side application is hosted.

In summary, this code sets up an Express server with Socket.IO integration, allowing real-time communication between clients and the server, and specifies CORS settings to control cross-origin access to the server.


User
can you pass the same express app to different http servers?
ChatGPT
Yes, you can pass the same Express app instance to different HTTP servers. This can be useful in scenarios where you want to run multiple servers with the same application logic, or when you want to create different servers for different purposes (e.g., HTTP and HTTPS).

For example:

javascript
Copy code
import express from 'express';
import http from 'http';
import https from 'https';

const app = express();

// Create an HTTP server
const httpServer = http.createServer(app);
httpServer.listen(80, () => {
  console.log('HTTP server running on port 80');
});

// Create an HTTPS server
const httpsServer = https.createServer({
  // SSL configuration
}, app);
httpsServer.listen(443, () => {
  console.log('HTTPS server running on port 443');
});
In this example, the same app instance is passed to both the HTTP and HTTPS servers. This allows the same application logic to be used for handling requests on both servers. The http.createServer() and https.createServer() functions create the respective servers, with the Express app handling the incoming requests.


==============================================================================================================

Note:

Listening to events
There are several ways to handle events that are transmitted between the server and the client.

EventEmitter methods
On the server-side, the Socket instance extends the Node.js EventEmitter class.

On the client-side, the Socket instance uses the event emitter provided by the component-emitter library, which exposes a subset of the EventEmitter methods.

socket.on(eventName, listener)
Adds the listener function to the end of the listeners array for the event named eventName.

socket.on("details", (...args) => {
  // ...
});

==============================================================================================================

Note:

This code snippet sets up a socket.io server that listens for client connections. Here's a breakdown:

io.on("connection", (socket) => { ... }): This code listens for incoming connections from clients. When a client connects to the server, the provided callback function is executed. The socket parameter represents the connection to the client.

console.log("a user connected: ", socket.id ): This line logs a message to the console indicating that a user has connected to the server. It also logs the socket.id, which is a unique identifier for the socket connection.

socket.on("disconnect", () => { ... }): This sets up a listener for the disconnect event. When a client disconnects from the server, the provided callback function is executed. The socket.id is again logged to the console to identify which user disconnected.

Overall, this code sets up basic logging for when users connect and disconnect from the socket.io server, allowing you to monitor client activity in real-time.

==============================================================================================================

Note:

The socket.on("disconnect", () => { ... }) can be placed outside the listener function being added to the connection event. It doesn't have to be nested inside that listener. You can place it anywhere within the scope where you have access to the socket object.

==============================================================================================================

Note:

Yes, you can pass the same Express app instance to different HTTP servers. This can be useful in scenarios where you want to run multiple servers with the same application logic, or when you want to create different servers for different purposes (e.g., HTTP and HTTPS).

=============================================================================================

Note: socket.handshake:

In Socket.IO, socket.handshake provides information about the initial handshake that led to the establishment of the WebSocket connection between the client and the server. It contains details about the HTTP request that initiated the WebSocket upgrade.

Some common properties of socket.handshake include:

socket.handshake.headers: Contains the headers of the initial HTTP request.
socket.handshake.query: Contains the query parameters sent with the initial HTTP request.
socket.handshake.address: Contains information about the remote address of the client.

=============================================================================================

Note: io.emit()


In Socket.IO, io.emit() is used to broadcast an event to all connected clients. When you call io.emit(eventName, data), it sends the specified eventName along with optional data to every client that is currently connected to the Socket.IO server.
*/