import mongoose from "mongoose";
import User from "./user.model.js";

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ]
}, {timestamp: true}); //add createdAt and updatedAt fields to document

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;