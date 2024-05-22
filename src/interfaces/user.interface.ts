export interface User {
    _id:string,
    name: string,
    email:string,
    token:string,
    password: string,
    createdAt:Date,
    friends:Array<string>,
    friendsRequest:Array<string>
}

export interface AuthenticatedUser extends User {
    _id: string;
  }