import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client"

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();
    console.log("Auth User: ", authUser);
    useEffect(() => {
        if(authUser) {
            console.log("user logged in")
            const socket = io("https://chat-app-prod-7vcx.onrender.com", {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socket);
            // socket.on() is used to listen to the events - can be used on both the client and server 
            socket.on("getOnlineUsers", (users) => setOnlineUsers(users))
            return () => socket.close();
        } else {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])
    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
    )
}

/*

Note:

io([url][, options])
url <string> (defaults to window.location.host)
options <Object>
forceNew <boolean> whether to create a new connection
Returns <Socket>
Creates a new Manager for the given URL, and attempts to reuse an existing Manager for subsequent calls, unless the multiplex option is passed with false. Passing this option is the equivalent of passing "force new connection": true or forceNew: true.

A new Socket instance is returned for the namespace specified by the pathname in the URL, defaulting to /. For example, if the url is http://localhost/users, a transport connection will be established to http://localhost and a Socket.IO connection will be established to /users.

Query parameters can also be provided, either with the query option or directly in the url (example: http://localhost/users?token=abc).

To understand what happens under the hood, the following example:

import { io } from "socket.io-client";

const socket = io("ws://example.com/my-namespace", {
  reconnectionDelayMax: 10000,
  auth: {
    token: "123"
  },
  query: {
    "my-key": "my-value"
  }
});

is the short version of:

import { Manager } from "socket.io-client";

const manager = new Manager("ws://example.com", {
  reconnectionDelayMax: 10000,
  query: {
    "my-key": "my-value"
  }
});

const socket = manager.socket("/my-namespace", {
  auth: {
    token: "123"
  }
});

=============================================================================================

Note: ChatGPT explanation of const socket = io(...)


This code establishes a WebSocket connection from the client-side to the server-side using Socket.IO. Here's a breakdown of what's happening:

io is a function provided by the socket.io-client library. It's used to create a new Socket.IO client instance.

"http://localhost:5000" is the URL of the server to which the client will connect. This URL typically corresponds to the server where the Socket.IO server is running. In this case, it's connecting to a Socket.IO server running on localhost on port 5000.

const socket = io("http://localhost:5000"); creates a new Socket.IO client instance and establishes a WebSocket connection to the specified server. The socket object represents this connection.

Once the connection is established, the client can send and receive messages to and from the server using this socket object.


*/