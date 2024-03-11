import mongoose, { Schema } from "mongoose";
import { User } from "../interfaces/user.interface";
const commentSchema:Schema = new mongoose.Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  createAt: Date
  
})

const commentModel = mongoose.model<Comment>('Comment', commentSchema)

export default commentModel