
import userModel from "../models/user.model"
import { NextFunction, Request, Response } from "express";
import { createToken } from "../utils/jwt";
import passport from "passport";


export const register = async (req: Request, res: Response, next:NextFunction) => {
    passport.authenticate('register', (err:any, user:any, info:any) => {
        if (err) {
          return res.status(500).json({ error: 'Error en el registro' });
        }
        if (!user) {
          return res.status(400).json({ error: info.message });
        }
        return res.status(200).json({ message: 'Registro exitoso', user });
      })(req, res, next);
};

export const login = async (req: Request, res: Response, next: NextFunction) => {    
    passport.authenticate('login', (err:any, user:any, info:any) => {
        if (err) {
          return res.status(500).json({ error: 'Error en el inicio de sesión' });
        }
        if (!user) {
          return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        const token = createToken(user);
  
      
      res.cookie('token', token ,{httpOnly:true});
        return res.status(200).json( user);
      })(req, res, next);
  };

export const profile = async(req:Request,res:Response)=>{
    const userId = req.params._id
    try{
        const user = await userModel.find({_id: userId})
        if(!user) return res.status(400).json({message:'usuario no existente'})
        if(user) return  res.status(200).json(user)
    }catch{

    }
}


export const logout = async(req:Request,res:Response)=>{
    res.clearCookie('token')
    res.json({message:'deslogueado'})    
}




export const updatedUser = async (req: Request, res: Response) => {
    const userId = req.params._id
    const userData = req.body
    
    const userEdit = {
        name: userData.name,
        email: userData.email
    }
    
    await userModel.findByIdAndUpdate(userId, userData)
    
    res.json({ message: 'actualizado' })
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params._id
        const user = await userModel.findById(userId)
        
        if (!user) {
            res.json({ message: 'no existe este usuario' })
        }
        
        await userModel.findByIdAndDelete(userId)
        
        res.json({ message: 'Eliminado' })
    } catch {
        console.log('error');
        
    }
}




