import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

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

        // SOCKET IO FUNCTIONALITY WILL GO HERE

        //await conversation.save();
        //await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]); //See notes below
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
    */