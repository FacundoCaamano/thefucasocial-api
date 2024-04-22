import express from 'express'
import {createUser, deleteUser, login, logout, profile, updatedUser } from '../controllers/user.controllers'
import passport from 'passport'


const router = express.Router()

router.post('/create-user', createUser)
router.post('/login', login);
router.get('/profile/:_id',passport.authenticate("jwt", { session: false}) ,profile)
router.put('/edit-user/:_id', updatedUser)
router.delete('/delete-user/:_id', deleteUser)
router.get('/logout', logout)

export default router 