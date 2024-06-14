import express from 'express'
import { createMessages, getMessages } from '../controllers/messages.controllers'

const router = express.Router()

router.get('/messages/:userId/:friendId',getMessages)
router.post('/create-message',createMessages)

export default router