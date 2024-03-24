import express from 'express'
import { authUser, createUser, deleteUser, login, updatedUser } from '../controllers/user.controllers'
import { verifyToken } from '../utils/jwt'

const router = express.Router()

router.post('/create-user', createUser)
router.post('/login', login)
router.post('/auth-check',authUser)

router.put('/edit-user/:_id', updatedUser)
router.delete('/delete-user/:_id', deleteUser)

export default router