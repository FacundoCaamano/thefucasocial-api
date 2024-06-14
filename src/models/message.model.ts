import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },
    userName:String,
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:String,
    timestamp: { type: Date, default: Date.now },
})

const messageModel = mongoose.model('Message', MessageSchema)

export default messageModel