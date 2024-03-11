import { User } from "./user.interface";

export interface Post {
    _id: string,
    content:string,
    author: User['_id'],
    createdAt:Date
}