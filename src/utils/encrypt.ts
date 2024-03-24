const bcrypt = require('bcrypt')

export async function hashPassword(password:string) {
    return await bcrypt.hash(password, 10)
}

export async function  comparePassword(password:string, hashedPassword:string) {

    const isValidPassword = await bcrypt.compare(password, hashedPassword)
    if(isValidPassword) return isValidPassword
        
    
}   