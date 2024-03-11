import { Request, Response } from "express"
import commentModel from "../models/comment.model"

export const createComment = async (req:Request,res:Response) =>{
    const content = req.body.content
    const postId = req.body.post
    const author = req.body.author

    const newComment = {
        content,
        author,
        post:postId,
        createAt: new Date()
    }

    await commentModel.create(newComment)

    res.json({message: 'creado'})

}

export const getCommentByPostId= async (req:Request,res:Response)=>{
    try{

        const postId = req.params._id
        const comments = await commentModel.find({post: postId})

        if(!comments){
            res.json({message:'no se encontraron comentarios'})
        }

        res.json({message: 'comentarios obtenidos', comments})
    }catch{
        console.log('error');
        
    }

    
}