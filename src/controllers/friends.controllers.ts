import userModel from "../models/user.model"
import { Request, Response } from "express"
import mongoose from "mongoose"

export const getFriends = async (req: Request, res: Response) => {
  const userId = req.params._id
  const user = await userModel.findById(userId)
  try {
    if (!user) {
      res.status(404).json({ message: 'usuario no encontrado' })
    }
    if (user) {

      const friends = (await user.populate('friends')).friends

      const infoFriendsFilter = friends.map((friend: any) => ({
        _id: friend._id,
        name: friend.name as string,
        email: friend.email as string
      }))

      res.status(200).json(infoFriendsFilter)
    }

  } catch (err) {
    console.log('error en el servidor', { message: err });
  }
}

export const searchUser = async (req: Request, res: Response) => {
  const query = req.query.q as string
  try {
    if (!query) {
      return res.status(400).json({ message: 'No se proporcionó ningún término de búsqueda' });
    }
    const users = await userModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }
      ]
    }).select('name')
    res.status(200).json(users)
  } catch (err) {
    console.error('Error en el servidor', { message: err });
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

export const getFriendsRequest = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const user = await userModel.findById(userId).populate('friendsRequest', 'name')
  try {
    const friendsRequests = user?.friendsRequest
    res.status(200).json(friendsRequests)
  } catch (err) {
    console.log(err);
  }
}

export const sendFriendRequest = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const friendId = req.body.friendId;

  try {
      const user = await userModel.findById(userId);
      const friend = await userModel.findById(friendId);

      if (!friend || !user) {
          return res.status(404).json({ message: 'User not found' });
      }
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({ message: 'Invalid User ID or Friend ID' });
      }
      if (friend.friendsRequest.includes(userId)) {
          return res.status(400).json({ message: 'Request already sent' });
      }

      friend.friendsRequest.push(userId);
      await friend.save();
      res.status(200).json({ message: 'Friend request sent' });
  } catch (err) {
      console.error('Error in sendFriendRequest:', err);
      res.status(500).json({ message: 'Server error', err });
  }
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  const userId = req.body.userId
  const friendId = req.body.friendId

  try {
    const user = await userModel.findById(userId)
    const friend = await userModel.findById(friendId)

    if (user && friend) {
      user.friends.push(friend._id)
      friend.friends.push(user._id)
      user.friendsRequest = user.friendsRequest.filter(_id => _id.toString() !== friendId)
      user.save()
      friend.save()
      res.status(200).json({ message: "solicitud aceptada" })
    }
  } catch (error) {
    res.status(500).json({ message: "error en el servidor", error })
  }
}

export const rejectFriendRequest = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const friendId = req.params.friendId

  const user = await userModel.findById(userId)
  const friend = await userModel.findById(friendId)
  if (!user || !friend) {
    res.status(404).json({ message: 'no encontrado' })
  }
  if (user) {
    user.friendsRequest = user.friendsRequest.filter(_id => _id.toString() !== friendId)
    user.save()
    res.status(200).json({ message: 'solicitud rechazada' })
  }
}

export const deleteFriend = async (req: Request, res: Response) => {

  const friendId = req.params.friendId
  const userId = req.params.userId
  
  try {

    const user = await userModel.findById(userId).populate('friends', '_id name email')
    const friend = await userModel.findById(friendId).populate('friends', '_id name email')

    if (!user) res.status(404).json({ message: 'usuario no encontrado' })

    if (user) {
      user.friends = user.friends.filter((f:any) => f._id.toString() !== friendId)
      user.save()
      if(friend)  {
        friend.friends = friend?.friends.filter((f:any)=> f._id.toString() !== userId)
        friend?.save()
      }
      res.send(user.friends)
    }

  } catch (err) {
    res.status(400).json({ message: "error", err })
  }
}