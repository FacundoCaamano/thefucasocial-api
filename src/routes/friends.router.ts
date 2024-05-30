import express from 'express'
import { getFriends, sendFriendRequest,searchUser, getFriendsRequest, acceptFriendRequest, rejectFriendRequest, deleteFriend } from '../controllers/friends.controllers'


const router = express.Router()

router.get('/search',searchUser)
router.get('/myfriends/:_id', getFriends)
router.get('/friendsRequest/:userId',getFriendsRequest)
router.post('/sendfriendrequest', (req:any,res)=> sendFriendRequest(req,res,req.io))
router.post('/acceptfriend', acceptFriendRequest)
router.delete('/rejectfriend/:userId/:friendId', rejectFriendRequest)
router.delete('/friend-delete/:userId/:friendId', deleteFriend)
export default router