import express from 'express'
import { createUser, deleteUser, getUsers, login, updatedUser } from '../controllers/user.controllers'

const router = express.Router()

router.post('/create-user', createUser)
router.post('/login', login)
router.get('/users', getUsers)
router.put('/edit-user/:_id', updatedUser)
router.delete('/delete-user/:_id', deleteUser)

export default router