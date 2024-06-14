import {Request, Response} from 'express'
import messageModel from '../models/message.model'


export const getMessages = async(req:Request,res:Response) =>{
    const userId = req.params.userId
    const friendId = req.params.friendId
    try{
        const message = await messageModel.find({
            $or:[
                {userId, friendId},
                {userId:friendId, friendId:userId}
            ]
        }).sort('timestamp')
        res.json(message)
    }catch(err){
        res.status(500).send(err)
    }
}

export const createMessages = async(req:Request,res:Response) =>{
    const {userId,userName, friendId,message} = req.body
    try{
        console.log(userId,userName,friendId,message);
        
         const createMessage = await messageModel.create({userId,userName,message,friendId})
         res.status(201).send(createMessage)
    }catch(err){
        res.status(500).send({message:'error cuack', err})
    }

}