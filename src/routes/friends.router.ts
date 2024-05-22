import express from 'express'
import { getFriends, sendFriendRequest,searchUser, getFriendsRequest, acceptFriendRequest, rejectFriendRequest } from '../controllers/friends.controllers'


const router = express.Router()

router.get('/search',searchUser)
router.get('/myfriends/:_id', getFriends)
router.get('/friendsRequest/:userId',getFriendsRequest)
router.post('/sendfriendrequest', sendFriendRequest)
router.post('/acceptfriend', acceptFriendRequest)
router.delete('/rejectfriend/:userId/:friendId', rejectFriendRequest)
export default router