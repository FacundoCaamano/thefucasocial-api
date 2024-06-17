import express from 'express'
import { getFriends, sendFriendRequest,searchUser, getFriendsRequest, acceptFriendRequest, rejectFriendRequest, deleteFriend } from '../controllers/friends.controllers'
import { passportCall } from '../utils/jwt'


const router = express.Router()

router.get('/search',searchUser)
router.get('/myfriends/:_id', passportCall('jwt'),getFriends)
router.get('/friendsRequest/:userId',passportCall('jwt'),getFriendsRequest)
router.post('/sendfriendrequest',passportCall('jwt') ,sendFriendRequest)
router.post('/acceptfriend',passportCall('jwt'), acceptFriendRequest)
router.delete('/rejectfriend/:userId/:friendId',passportCall('jwt'), rejectFriendRequest)
router.delete('/friend-delete/:userId/:friendId',passportCall('jwt') ,deleteFriend)
export default router