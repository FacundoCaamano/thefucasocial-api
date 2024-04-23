import express from 'express'
import {deleteUser,  logout, updatedUser } from '../controllers/user.controllers'
import passport from 'passport'
import { createToken } from '../utils/jwt';


const router = express.Router()

router.post('/register', (req, res, next) => {
    passport.authenticate('register', (err:any, user:any, info:any) => {
      if (err) {
        return res.status(500).json({ error: 'Error en el registro' });
      }
      if (!user) {
        return res.status(400).json({ error: info.message });
      }
      // Si el usuario se registra exitosamente, puedes responder con éxito o redirigir a otra página
      return res.status(200).json({ message: 'Registro exitoso', user });
    })(req, res, next);
  });

  router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err:any, user:any, info:any) => {
      if (err) {
        return res.status(500).json({ error: 'Error en el inicio de sesión' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
      const token = createToken(user);

    
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
      return res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    })(req, res, next);
  });
  
router.put('/edit-user/:_id', updatedUser)
router.delete('/delete-user/:_id', deleteUser)
router.get('/logout', logout)

export default router 
// router.post('/login', login);
// router.get('/profile/:_id',passport.authenticate("jwt", { session: false}) ,profile)
// router.post('/create-user', createUser)