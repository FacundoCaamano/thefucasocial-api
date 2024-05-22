import { User } from "../interfaces/user.interface"
import userModel from "../models/user.model"
import { Request, Response } from "express"

export const getFriends = async (req:Request,res:Response) =>{
  const userId = req.params._id
  const user = await userModel.findById(userId)
  try{
    if(!user){
      res.status(404).json({message:'usuario no encontrado'})
    }
    if(user){
      
      const friends= (await user.populate('friends')).friends

      const infoFriendsFilter = friends.map((friend:any) => ({
        name:friend.name as string,
        email: friend.email as string
      }))

      res.status(200).json(infoFriendsFilter)
    }
   
  }catch(err){
    console.log('error en el servidor',{message:err});
  }
}

export const searchUser = async (req:Request, res:Response ) =>{
  const query = req.query.q as string
  try{
    if (!query) {
      return res.status(400).json({ message: 'No se proporcionó ningún término de búsqueda' });
    }
    const users = await userModel.find({
      $or:[
        {name: {$regex: query, $options: 'i'}}
      ]
    }).select('name')
    res.status(200).json(users)
  }catch(err){
    console.error('Error en el servidor', { message: err });
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

export const getFriendsRequest =async (req:Request,res:Response)=>{
  const userId = req.params.userId
  const user = await userModel.findById(userId).populate('friendsRequest', 'name')
  try{
    const friendsRequests= user?.friendsRequest
    res.status(200).json(friendsRequests)
  }catch(err){
    console.log(err);
  }
}

export const sendFriendRequest =async (req:Request,res:Response) =>{
    const userId = req.body.userId
    const friendId = req.body.friendId
   
    
    try{
      const user = await userModel.findById(userId)
      const friend = await userModel.findById(friendId)
  
      if(!friend || !user){
        res.status(404).json({message:'no encontrado'})
      }
      if(friend?.friendsRequest.includes(userId)){
        res.status(400).json({message:'solicitud ya enviada'})
      }else{
        friend?.friendsRequest.push(userId)
        await friend?.save()
        res.status(200).json({message:"solicitud enviada"})
      }
  
    }catch(err){
      res.status(500).json({message:'error', err})
    }
  }
  
  
  export const acceptFriendRequest = async (req:Request,res:Response)=>{
    const userId = req.body.userId
    const friendId = req.body.friendId
    
    try{
       const user = await userModel.findById(userId)
       const friend = await userModel.findById(friendId)
       
       if(user && friend){
          user.friends.push(friend._id)
          user.friendsRequest = user.friendsRequest.filter(_id => _id.toString() !== friendId)
          user.save()
          res.status(200).json({message:"solicitud aceptada"})
       }
    }catch(error){
      res.status(500).json({message:"error en el servidor", error})
    }
  }
  
  export const rejectFriendRequest = async(req:Request,res:Response)=>{
    const userId = req.params.userId
    const friendId = req.params.friendId
    
    const user =await userModel.findById(userId)
    const friend = await userModel.findById(friendId)
    if(!user || !friend){
      res.status(404).json({message:'no encontrado'})
    }
    if(user){
      user.friendsRequest = user.friendsRequest.filter(_id => _id.toString() !== friendId)
      user.save()
      res.status(200).json({message:'solicitud rechazada'})
    }
  }