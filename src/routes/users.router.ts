import express from 'express'
import {deleteUser,  login,  logout, register, updatedUser } from '../controllers/user.controllers'
import passport from 'passport'
import { createToken, passportCall } from '../utils/jwt';


const router = express.Router()

router.post('/register', register);

  router.post('/login', login);

  router.get('/userauth', passportCall('jwt'), (req, res) => {
    res.json(req.user);
});
  
router.put('/edit-user/:_id', updatedUser)
router.delete('/delete-user/:_id', deleteUser)
router.get('/logout', logout) 

export default router 
