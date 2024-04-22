// import { NextFunction,Request,Response } from "express"
// import passport from "passport"
// import { User } from "../interfaces/user.interface"

// export const passportCall = (strategy:any) =>{
//     return async(req:Request,res:Response,next:NextFunction)=>{
//         passport.authenticate(strategy, function(err:Error, user:any, info:any){
//             if(err) return next(err)
//                 if(!user){
//                     return res.status(401).send({error: info.messages ? info.messages : info.toString()})
//                 }
//                 req.user = user
//                 next()
//         })(req,res,next)
//     }
// }

// export const authorization = (role:any) =>{
//     return async(req:Request, res:Response, next:NextFunction)=>{
//         let user:User = req.user as User
//         if(!user){
//             res.status(401).send({error: "no autorizado"})
//         } 
//         if(user!.role !== role){
//             return res.status(403).send({error:'no permitido'})
//         } 
//         next()
//     }
// }
// pasarle la info desencriptada para que acceda al role, luego pasar el middelware a los endpoints con el parametro del rol necesario