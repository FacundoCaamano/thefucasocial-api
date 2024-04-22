import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import userModel from "../models/user.model";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jdf93jfy39dhwl",
};

const initializePassport =()=>{
  passport.use(
    new Strategy(opts, async (payload, done) => {
      try {
        const user = await userModel.findById(payload._id);
        if (user) return done(null, user); 
        else return done(null, false);
      } catch (error) {
        return done(error);
      }
    })
  );
}
export default initializePassport