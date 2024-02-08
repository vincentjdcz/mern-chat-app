import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,

    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"] //specify which values this property can take
    },
    profilePic: {
        type: String,
        defailt: ""
    }
}, {timestamps: true}); //add createdAt and updatedAt fields to document

const User = mongoose.model("User", userSchema);

export default User;