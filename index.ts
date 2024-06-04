import express from 'express'
import mongoose from 'mongoose'
import user from './src/routes/users.router'
import post from './src/routes/post.router'
import comment from './src/routes/comment.router'
import friends from './src/routes/friends.router'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './src/config/passport.config'
import { Server } from 'socket.io'
import http from 'http'

require('dotenv').config()
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};


const app = express()
const server = http.createServer(app)

export const io = new Server(server,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        credentials: true
      }
})

app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.json())
app.use(passport.initialize())
initializePassport()


app.use('/thefucasocial',user)
app.use('/thefucasocial', post)
app.use('/thefucasocial', comment)
app.use('/thefucasocial', friends)


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
                console.log(users); // Mostrar el mapa de usuarios después de registrar
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
    })
    
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  
  });
