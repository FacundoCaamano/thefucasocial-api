import userModel from "../models/user.model"
import jwt, { ExtractJwt } from 'passport-jwt'
import passport from "passport"
import { User } from "../interfaces/user.interface"

const jwtStrategy = jwt.Strategy
const extractJwt = jwt.ExtractJwt.fromAuthHeaderAsBearerToken()
const initializePassport = () => {
   
    
  };

export default initializePassport
  