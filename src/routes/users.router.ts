import express from 'express'
import {createUser, deleteUser, login, logout, updatedUser } from '../controllers/user.controllers'
import passport from 'passport'


const router = express.Router()

router.post('/create-user', createUser)
router.post('/login', passport.authenticate('jwt', { session: false }), login);
//router.get('/auth-check', passport.authenticate('jwt', { session: false }), authUser);
router.put('/edit-user/:_id', updatedUser)
router.delete('/delete-user/:_id', deleteUser)
router.get('/logout', logout)

export default router