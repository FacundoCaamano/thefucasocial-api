import express from 'express'
import mongoose from 'mongoose'
import user from './src/routes/users.router'
import post from './src/routes/post.router'
import comment from './src/routes/comment.router'
const app = express()

app.use(express.json())

app.use('/thefucasocial',user)
app.use('/thefucasocial', post)
app.use('/thefucasocial', comment)

mongoose.connect(
    'mongodb+srv://FacundoCaamano:LyMXNeB3ETCiOiyu@cluster0.udrqoio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
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

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });