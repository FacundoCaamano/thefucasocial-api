export interface User {
    _id:string,
    name: string,
    email:string,
    password: string,
    createdAt:Date
}

export interface AuthenticatedUser extends User {
    _id: string;
  }