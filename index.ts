import express from 'express'
import mongoose from 'mongoose'
import user from './src/routes/users.router'
import post from './src/routes/post.router'
import comment from './src/routes/comment.router'
import friends from './src/routes/friends.router'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './src/config/passport.config'



require('dotenv').config()
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
  };


const app = express()


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
if(mongo_uri){    
    mongoose.connect(
        mongo_uri,
        {
            dbName:'theFucaSocial'
        }
        )
        
        mongoose.connection.on('connected', async() =>{
            console.log('conectado a la base');
            app.listen(3000, ()=>{
                console.log('servidor corriendo en 3000');
            })
            
        })
    }

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  
  });