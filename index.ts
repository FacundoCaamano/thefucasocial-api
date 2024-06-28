import express from 'express'
import mongoose from 'mongoose'
import user from './src/routes/users.router'
import post from './src/routes/post.router'
import comment from './src/routes/comment.router'
import friends from './src/routes/friends.router'
import messages from './src/routes/message.router'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './src/config/passport.config'
import { Server } from 'socket.io'
import http from 'http'
import messageModel from './src/models/message.model'


require('dotenv').config()
const cors = require('cors')

const corsOptions = {
    origin: 'https://thefucasocial.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
};


const app = express()
const server = http.createServer(app)

 export const io = new Server(server,{
     cors: {
         origin: "https://thefucasocial.vercel.app",
         methods: ["GET", "POST"],
        credentials: true
       }
 })

app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
initializePassport()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://thefucasocial.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use('/thefucasocial',user)
app.use('/thefucasocial', post)
app.use('/thefucasocial', comment)
app.use('/thefucasocial', friends)
app.use('/thefucasocial', messages)

const mongo_uri = process.env.MONGO_URI
export const users = new Map()
if(mongo_uri){    
    mongoose.connect(
        mongo_uri,
        {
            dbName:'theFucaSocial'
        }
        )
        
        mongoose.connection.on('connected', async() =>{
            console.log('conectado a la base');
            server.listen(3000, ()=>{
                console.log('servidor corriendo en 3000');
            })
            
        })

    }
     io.on('connection',(socket)=>{
        
         socket.on('register', (userId) => {
             if (userId) {
                 users.set(userId, socket.id);
                 console.log(`Usuario ${userId} registrado con socket ID: ${socket.id}`);
                 console.log(users); 
             } else {
                 console.log('User ID no proporcionado para el registro');
             }
         });
         socket.on('sendFriendRequest', (data) => {
             console.log('Datos recibidos para enviar solicitud de amistad:', data);
             const friendSocketId = users.get(data.friendId);
             console.log(`Socket ID para friendId ${data.friendId}:`, friendSocketId);
    
             if (friendSocketId) {
                 io.to(friendSocketId).emit('friendRequestReceived', { userId: data.userId });
                 console.log(`Solicitud de amistad emitida al socket ID: ${friendSocketId}`);
             } else {
                 console.log('El amigo no está conectado.');
             }
         });

         socket.on('disconnect', () => {
             console.log('Usuario desconectado: ', socket.id);
             users.forEach((id, userId) => {
                 if (id === socket.id) {
                     users.delete(userId);
                     console.log(`Usuario ${userId} eliminado del registro de usuarios.`);
                 }
             });
         });

         socket.on('sendMessage', async (data) => {
             const { userId, userName, friendId, message } = data;
             try {
                 const createMessage = await messageModel.create({ userId, userName, message, friendId });
                 const friendSocketId = users.get(friendId);
                 if (friendSocketId) {
                     io.to(friendSocketId).emit('newMessage', createMessage);
                 }
             } catch (err) {
                 console.error('Error creando mensaje:', err);
             }
         });
     })
    
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  
  });

export default app;