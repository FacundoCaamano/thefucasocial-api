import { NextFunction,Request,Response } from "express"
import jwt from 'jsonwebtoken'
import userModel from "../models/user.model";
import passport from "passport";

const JWT_COOKIE_NAME = 'tokencookie'

export function createToken(usario:any){  
    const payload = {
        usario
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

// export const authToken = (req:Request,res:Response,next:NextFunction)=>{
//     const token = req.cookies[JWT_COOKIE_NAME]

//     if(!token) return res.status(401).send({error: 'no autenticado'})

//     jwt.verify(token, process.env.SECRET_KEY as string,(error:any, credentials:any)=>{
//         if(error) return res.status(403).send({error:'no autorizado'})
//             req.user = credentials.user

//         next()
//     })   
// }

export const extractCookie = (req:Request) =>{
    return (req && req.cookies) ? req.cookies[JWT_COOKIE_NAME] : null
}

export const passportCall = (strategy:any)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        passport.authenticate(strategy, function(err:any,user:any,info:any){
            if(err) return next(err)
            if(!user) return res.status(401).send('no se encontro')
                
        })
    }
}