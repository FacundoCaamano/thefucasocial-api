import { Post } from "./post.interfaces";
import { User } from "./user.interface";

export interface Comment {
    content: string;
    author: User['_id'];
    post: Post['_id'];
    likes: User['_id'][];
    dislikes:User['_id'][];
    createAt:Date
}