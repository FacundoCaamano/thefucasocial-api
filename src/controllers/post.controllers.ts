import { Request, Response } from "express"
import postModel from "../models/post.model"
import { Post } from "../interfaces/post.interfaces"
import { use } from "passport"

export const getPost = async (req:Request,res:Response)=>{
    try{
        const posts = await postModel.find().sort({createdAt: -1}) 
        res.json(posts)
    }catch(err){
        console.log(err);
        
    }
}

export const getPostsById = async(req:Request,res:Response)=>{
    try{
        const userId = req.params.userId
        const posts = await postModel.find({authorId: userId})

        res.json(posts)
    }catch(err){
        console.log(err);   
    }
}

export const createPost = async (req:Request,res:Response) =>{
    try{
        const {content,authorName} = req.body
        const authorId = req.params._id
        
        const newPost = {
            content,
            authorId,
            authorName,
            createdAt: new Date()
        }
        
        const postCreate = await postModel.create(newPost)
        
        res.json(postCreate)
    }catch(error){
        console.log('error',error);
        
    }
}

export const deletePost = async (req:Request,res:Response) =>{
    try{
        const postId  = req.params.postId
        const userId = req.params.userId
        const post = await postModel.findById(postId)
      
        if(!post){
            res.json({message:'no se encontro el post'})
        }

        if(post?.authorId == userId){   
            await postModel.deleteOne({'_id':postId})
        }
 
        res.json({message:'eliminado'})
    }catch(error){
        console.log({message:'error al eliminar', error});
        
    }
}

export const like = async (req:Request,res:Response)=>{
    try{

        const postId = req.params.postId 
        const post:any = await postModel.findById(postId)
        const userId = req.params.userId
        
        if(!post){
            return res.status(404).json({message: ' no se econtro el post'})
        }
        
        if(post.likes?.includes(userId)){
            post.likes.pull(userId)
        }
        
        else{
            post.likes.push(userId)
        }
        
        if (post.dislikes.includes(userId)) {
            post.dislikes.pull(userId);
        }
        
        await post.save();
        
        res.json({ message: 'Like actualizado' });
    }catch(error){
        console.log({ message: 'Error al actualizar like', error });
        res.status(500).json({ message: 'Error interno del servidor' });
    }
    }

    export const dislike = async (req:Request,res:Response)=>{
        try{
    
            const postId = req.params.postId 
            const post:any = await postModel.findById(postId)
            const userId = req.params.userId
            
            if(!post){
                return res.status(404).json({message: ' no se econtro el post'})
            }
            
            if(post.dislikes?.includes(userId)){
                post.dislikes.pull(userId)
            }
            
            else{
                post.dislikes.push(userId)
            }
            
            if (post.likes.includes(userId)) {
                post.likes.pull(userId);
            }
            
            await post.save();
            
            res.json({ message: 'Like actualizado' });
        }catch(error){
            console.log({ message: 'Error al actualizar like', error });
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        }