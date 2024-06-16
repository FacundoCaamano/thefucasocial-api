import mongoose, { Schema } from "mongoose";
import { Comment } from "../interfaces/comment.interfaces";
const commentSchema: Schema = new mongoose.Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  authorName: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post',
  },
  likes:
    [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
    ],
  dislikes:
    [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
    ],
  createAt: Date

})

const commentModel = mongoose.model<Comment>('Comment', commentSchema)

export default commentModel