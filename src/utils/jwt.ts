import { NextFunction,Request,Response } from "express"
import jwt from 'jsonwebtoken'

import passport from "passport";

const JWT_COOKIE_NAME = 'token'

export function createToken(usuario:any){  
    const payload = {
        usuario
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY as string,{expiresIn:'7d'})
   
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

export const extractCookie = (req:Request) =>{
    return (req && req.cookies) ? req.cookies[JWT_COOKIE_NAME] : null
}

export const passportCall = (strategy:any)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        passport.authenticate(strategy, function(err:any,user:any,info:any){
            if(err) return next(err)
            if(!user) return res.status(401).send('Usuario no autenticado')
            req.user = user    
            next()
        })(req,res,next)
    }
}