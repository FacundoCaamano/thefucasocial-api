import express from 'express'
import { createMessages, getMessages } from '../controllers/messages.controllers'
import { passportCall } from '../utils/jwt'

const router = express.Router()

router.get('/messages/:userId/:friendId',passportCall('jwt'),getMessages)
//router.post('/create-message',passportCall('jwt'),createMessages)

export default router