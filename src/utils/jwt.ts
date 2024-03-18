
const jwt = require('jsonwebtoken')

export function createToken (usario:any){
    const payload={
        tokenn: usario
    }

    const secretKey = process.env.SECRET_KEY
    const token = jwt.sign(payload, secretKey)
    console.log(token);
    return token
}