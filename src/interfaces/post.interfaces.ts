import { User } from "./user.interface";

export interface Post {
    _id: string,
    content:string,
    authorId: User['_id'],
    authorName: User['name']
    likes: User['_id'][];
    dislikes: User['_id'][];
    createdAt:Date
}