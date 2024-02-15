import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params; //id is id of user we are sending message to. express automatically parses url parameters and makes them available in req.params. no need for middleware 
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({ //check if a conversation exists between these users
            participants: {$all: [senderId, receiverId]}, //The $all operator is used to match documents where the participants array contains all the specified elements.
        })

        if(!conversation) { //if no conversation exists between users, create one
            conversation = await Conversation.create({
                participants: [senderId, receiverId],

            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }
        
        //await conversation.save();
        //await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]); //See notes below

        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            // io.to(<socket_id>).emit() is used to send events to specific client (see below notes for more details)
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: error.message}); //TODO: change to something more generic when in production
    }
}


export const getMessages = async (req, res) => {
    try{

        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId]}
        }).populate("messages"); //See notes below

        if(!conversation) return res.status(200).json([]);
        const messages = conversation.messages;
        res.status(200).json(messages);

    } catch (error){
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({error: error.message}); //TODO make generic in prod
    }
}
/*
    Note: Promise.all:
    Promise.all(): This is a utility function in JavaScript that takes an array of Promises and returns a single Promise that resolves when all of the input Promises have resolved, or rejects as soon as one of the input Promises rejects.

    By awaiting Promise.all([conversation.save(), newMessage.save()]), the code is effectively waiting for both conversation.save() and newMessage.save() to complete asynchronously. If both operations are successful, the Promise.all() call will resolve, and the code execution will continue.

    ========================================================================================

    Note: .populate("messages");

    .populate("messages"): This is a method provided by Mongoose to populate referenced documents in a query result. In this case, it instructs Mongoose to populate the messages field of the retrieved conversation document with the actual message documents. This assumes that the messages field in the conversation schema is defined as a reference to another collection (likely the Message collection).

    When you call .populate("messages"), Mongoose will perform an additional query to the Message collection to fetch the documents referenced by the ObjectIds stored in the messages array of the conversation document being retrieved.

    Mongoose automatically matches the ObjectIds stored in the messages array with the _id of documents in the Message collection, populates the messages field in the conversation document with those documents, and returns the result.
    
    automatic population of fields in Mongoose relies on the fact that the referenced fields are of type Schema.Types.ObjectId. If the objects in the messages array were not of this type, Mongoose would not recognize them as references to documents in another collection, and the automatic population mechanism would not work.
    
    ========================================================================================

    Note: io.to()

    io.to() is a method in Socket.IO that allows you to send a message to a specific room or namespace. Rooms are a way to group sockets together so that you can broadcast messages to specific subsets of clients.

    Here's how you would typically use io.to():

    javascript
    Copy code
    // Server-side code
    io.to(roomName).emit(eventName, data);
    This code sends the specified eventName along with optional data to all sockets that have joined the room identified by roomName. It allows you to target a specific group of clients for broadcasting messages.

    For example:

    javascript
    Copy code
    // Server-side code
    io.to('room1').emit('chatMessage', 'Hello, room1!');
    In this example, the message 'Hello, room1!' will be sent to all clients that have joined the room named 'room1'.


    User
    how do you define a room
    ChatGPT
    In Socket.IO, rooms are created implicitly. When a socket joins a room using the join() method, Socket.IO creates the room if it doesn't already exist. You can join a room on the server side using the socket.join(roomName) method, and on the client side using the socket.join(roomName) method.

    Here's how you can define a room and have sockets join it:

    On the server:

    javascript
    Copy code
    io.on('connection', (socket) => {
        socket.join('room1');
    });
    On the client:

    javascript
    Copy code
    const socket = io();
    socket.emit('joinRoom', 'room1');
    In this example, when a socket connects to the server, it automatically joins the room named 'room1'. On the client side, you can emit a custom event (in this case, joinRoom) to tell the server which room to join.

    User
    do you have to pass a room to to() or can you pass a socket id?
    ChatGPT
    In Socket.IO, the to() method can accept either a room name or a socket ID.

    If you pass a room name, the event will be emitted to all sockets that are currently in that room.
    If you pass a socket ID, the event will be emitted only to the socket with that specific ID.
    Here's how you can use to() with a room name:

    javascript
    Copy code
    io.to('room1').emit('event', data);
    And here's how you can use it with a socket ID:

    javascript
    Copy code
    io.to(socketId).emit('event', data);
    Both of these examples will emit the event to the specified target(s).





    */