import { Request, Response } from "express"
import postModel from "../models/post.model"

export const getPost = async (req:Request,res:Response)=>{
    try{
        const posts = await postModel.find()
        res.json({posts})
    }catch{
        console.log('error');
        
    }
}

export const createPost = async (req:Request,res:Response) =>{
    try{
        const {content} = req.body
        const author = req.params._id
        
        const newPost = {
            content,
            author,
            createAt: new Date()
        }
        
        await postModel.create(newPost)
        
        res.json('creado')
    }catch(error){
        console.log('error',error);
        
    }
}

export const deletePost = async (req:Request,res:Response) =>{
    try{
        const postId  = req.params._id
        const post = await postModel.findById(postId)
      
        if(!post){
            res.json({message:'no se encontro el post'})
        }

        await postModel.deleteOne({'_id':postId})
 
        res.json({message:'eliminado'})
    }catch(error){
        console.log({message:'error al eliminar', error});
        
    }
}