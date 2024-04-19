"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportCall = void 0;
const passport_1 = __importDefault(require("passport"));
const passportCall = (strategy) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        passport_1.default.authenticate(strategy, function (err, user, info) {
            if (err)
                return next(err);
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
            }
            req.user = user;
            next();
        })(req, res, next);
    });
};
exports.passportCall = passportCall;
// export const authorization = (role:any) =>{
//     return async(req:Request, res:Response, next:NextFunction)=>{
//         let user:User = req.user as User
//         if(!user){
//             res.status(401).send({error: "no autorizado"})
//         } 
//         if(user!.role !== role){
//             return res.status(403).send({error:'no permitido'})
//         } 
//         next()
//     }
// }
// pasarle la info desencriptada para que acceda al role, luego pasar el middelware a los endpoints con el parametro del rol necesario
