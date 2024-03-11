
import userModel from "../models/user.model"
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        // Crear un nuevo usuario
        const newUser = new userModel({
            name,
            email,
            password,
            createdAt: new Date()
        });
        // Guardar el nuevo usuario en la base de datos
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

export const getUsers = async (req:Request,res:Response)=>{

    const users = await userModel.find()
    res.json(users)
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



