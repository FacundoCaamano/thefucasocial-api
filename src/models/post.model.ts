import mongoose, { Schema } from "mongoose";
import { Post } from "../interfaces/post.interfaces";
const postSchema:Schema = new mongoose.Schema({
    content:String,
    authorId:{
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required:true
    },
    authorName:String,
    createdAt: Date,
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    edit:{
        type:Boolean,
        default:false
    }

})





const postModel = mongoose.model<Post>('Post', postSchema)
export default postModel