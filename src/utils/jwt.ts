import { NextFunction,Request,Response } from "express"
import jwt from 'jsonwebtoken'
import userModel from "../models/user.model";


export function createToken (usario:any){
    const payload={
        token: usario
    }

     
    const token = jwt.sign(payload, process.env.SECRET_KEY as string)
   
    return token
}

export const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
    
    if(!req.headers['authorization']){
        return res.status(401).json({message:'Debes incluir la cabecera de autorización'})
    }
    
    const token = req.headers['authorization']

    let payload

    try{
        payload = jwt.verify(token, process.env.SECRET_KEY as string)
        next()
    }
    catch{
        return res.status(401).json({ message: 'Token inválido' });
    }

}

