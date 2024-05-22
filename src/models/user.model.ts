import mongoose, { Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const userSchema:Schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: String,
    password: {type: String, required: true},
    createdAt: Date,
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    friendsRequest:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})

const userModel = mongoose.model<User>("User", userSchema)

export default userModel