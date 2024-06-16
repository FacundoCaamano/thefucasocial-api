import { Request, Response } from "express"
import commentModel from "../models/comment.model"

export const createComment = async (req: Request, res: Response) => {
    const content = req.body.content
    const postId = req.body.post
    const author = req.body.author
    const authorName = req.body.authorName

    const newComment = {
        content,
        post: postId,
        author,
        authorName,
        createAt: new Date()
    }

    const comment = await commentModel.create(newComment)

    res.json(comment)

}

export const getCommentByPostId = async (req: Request, res: Response) => {
    try {

        const postId = req.params._id
        const comments:any = await commentModel.find({ post: postId }).sort({createAt:-1})

        if (!comments) {
            res.json({ message: 'no se encontraron comentarios' })
        }

        res.status(200).json(comments)
    } catch {
        console.log('error');

    }


}

export const likeComment = async (req: Request, res: Response) => {
    const commentId = req.body.commentId
    const userLike = req.body.userLike
    try{

        const comment:any = await commentModel.findById(commentId)
        
        if(comment.likes.includes(userLike)){
            comment.likes.pull(userLike)
        }
        else{
             comment.likes.push(userLike)
         }
         if(comment.dislikes.includes(userLike)){
            
            comment.dislikes.pull(userLike)
         }
        await comment.save()
        res.status(200).json(comment)
    }catch(err){
        console.log(err);
        
    }
   
}
export const dislikeComment = async (req: Request, res: Response) => {
    const commentId = req.body.commentId
    const userDislike = req.body.userDislike

    try {
        const comment: any = await commentModel.findById(commentId)
       
        if (comment?.dislikes.includes(userDislike)) {
            comment.dislikes.pull(userDislike)
            
        }
        else {
            comment.dislikes.push(userDislike)
        }
        if(comment?.likes.includes(userDislike)){
            comment.likes.pull(userDislike)
        }
         await comment.save()
        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json({ message: 'error en el servidor', error: err })
    }
}

export const deleteComment = async (req:Request,res:Response)=>{
    const commentId = req.params.commentId
    const userAuthorId = req.params.userAuthorId
    
    try{
        const comment = await commentModel.findById(commentId)
        if(comment?.author == userAuthorId){
            await commentModel.deleteOne({_id: comment._id})
            res.status(200).json({message:'comentario eliminado', comment})
        }
    }catch{
        console.log('err');
    }
}