
import userModel from "../models/user.model"
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/encrypt";
import { createToken, verifyToken } from "../utils/jwt";
import jwt from 'jsonwebtoken'


export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        // Crear un nuevo usuario
        const passwordHash = await hashPassword(password)

        const newUser = new userModel({
            name,
            email,
            password: passwordHash,
            createdAt: new Date()
        });
        // Guardar el nuevo usuario en la base de datos
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

export const login = async (req:Request,res:Response)=>{
    
    
    try{
    const {email, password} = req.body
    
    const user = await userModel.findOne({email})
    
     if(!user){
         res.status(404).send('Usuario no encontrado')
     }
     else{

         const comparePass = await comparePassword(password, user.password)
        if(comparePass){
            const token = createToken(user._id)
            res.status(200).json(token)
        }
        }
    }catch(err){
        res.status(500).json({message:'error al loguear', err})
    }
}

export const authUser = async(req:Request,res:Response)=>{
    const token = req.headers['authorization']
    let decoded:any
    let userId
    if(token){
         decoded = jwt.verify(token, process.env.SECRET_KEY as string)
         userId = decoded.token
    }
    const user = await userModel.findOne({_id: userId })
    if(user){
        const userFilterData = {
            name: user?.name,
            email: user?.email,
            createdAt: user?.createdAt
        }
        res.send(userFilterData)
    }
    
}



export const updatedUser = async (req:Request,res:Response)=>{
    const userId = req.params._id
    const userData = req.body

    const userEdit = {
        name: userData.name,
        email: userData.email
    }

    await userModel.findByIdAndUpdate(userId, userData)

    res.json({message:'actualizado'})
}

export const deleteUser=async (req:Request,res:Response)=>{
    try{
        const userId = req.params._id
        const user = await userModel.findById(userId)
        
        if(!user){
            res.json({message:'no existe este usuario'})
        }
        
        await userModel.findByIdAndDelete(userId)
        
        res.json({message: 'Eliminado'})
    }catch{
        console.log('error');
        
    }
}



