import mongoose, { Schema } from "mongoose";
import userModel from "./user.model";
import { User } from "../interfaces/user.interface";
import { Post } from "../interfaces/post.interfaces";
const postSchema:Schema = new mongoose.Schema({
    content:String,
    author:{
        type: Schema.Types.ObjectId, 
        ref:'user', 
        required:true
    },
    createAt: Date
})

const postModel = mongoose.model<Post>('Post', postSchema)

export default postModel