import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //indicates this will reference the id in the User collection.
        required: true
    },
    receiverId:{ //shouldn't this be conversation id?
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //indicates this will reference the id in the User collection.
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Message =  mongoose.model("Message", messageSchema);

export default Message;