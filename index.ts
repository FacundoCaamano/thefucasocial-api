import express from 'express'

const app = express()

app.use(express.json())

app.get('/',(req, res)=>{
    res.send('hola')
})

app.listen(3000, ()=>{
    console.log('servidor corriendo en 3000');
    
})