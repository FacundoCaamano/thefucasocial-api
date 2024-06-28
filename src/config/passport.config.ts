import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import userModel from "../models/user.model";
import local from "passport-local"
import { comparePassword, hashPassword } from "../utils/encrypt";
import { createToken, extractCookie } from "../utils/jwt";

const LocalStrategy = local.Strategy
const JWTStrategy = Strategy
const extractJwt = ExtractJwt



const initializePassport =()=>{

  passport.use('register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  } ,async(req, username, password,done)=>{
    try {
        const { name, email} = req.body;
        // Crear un nuevo usuario
        const passwordHash = await hashPassword(password)

        const newUser = new userModel({
            name,
            email,
            password: passwordHash,
            createdAt: new Date()
        });
        // Guardar el nuevo usuario en la base de datos
        const savedUser = await newUser.save();
        return done(null, savedUser)
    } catch (error) {
      return done("[LOCAL] error al registrar" + error)   
    }
}))

passport.use('login', new LocalStrategy({
  usernameField:'email'
},async (username, password, done)=>{
  try{
    let user = await userModel.findOne({email: username})
    if(!user){
      console.log('usuario no encontrado');
      return done(null, false)
    }
    if( !user || !(comparePassword(password, user?.password as string))){
        return done(null, false)
    }
    const userFilterData ={
      _id:user._id,
      name: user.name,
      email:user.email,
      createdAt: user.createdAt
    }
    const token = createToken(userFilterData)
   
    
    return done(null, userFilterData)
  }catch(err){
    console.log(err);
  }
}))

passport.use('jwt', new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([extractCookie]),
  secretOrKey: process.env.SECRET_KEY as string
}, async (jwt_payload, done) => {
  try {
    const user = await userModel.findById(jwt_payload.usuario._id);
    if (!user) {  
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));


 
}
export default initializePassport
