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
const passport_jwt_1 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
const user_model_1 = __importDefault(require("../models/user.model"));
const passport_local_1 = __importDefault(require("passport-local"));
const encrypt_1 = require("../utils/encrypt");
const jwt_1 = require("../utils/jwt");
const LocalStrategy = passport_local_1.default.Strategy;
const JWTStrategy = passport_jwt_1.Strategy;
const extractJwt = passport_jwt_1.ExtractJwt;
const initializePassport = () => {
    passport_1.default.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email } = req.body;
            // Crear un nuevo usuario
            const passwordHash = yield (0, encrypt_1.hashPassword)(password);
            const newUser = new user_model_1.default({
                name,
                email,
                password: passwordHash,
                createdAt: new Date()
            });
            // Guardar el nuevo usuario en la base de datos
            const savedUser = yield newUser.save();
            return done(null, savedUser);
        }
        catch (error) {
            return done("[LOCAL] error al registrar" + error);
        }
    })));
    passport_1.default.use('login', new LocalStrategy({
        usernameField: 'email'
    }, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let user = yield user_model_1.default.findOne({ email: username });
            if (!user) {
                console.log('usuario no encontrado');
                return done(null, false);
            }
            if (!user || !((0, encrypt_1.comparePassword)(password, user === null || user === void 0 ? void 0 : user.password))) {
                return done(null, false);
            }
            const userFilterData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            };
            const token = (0, jwt_1.createToken)(userFilterData);
            return done(null, userFilterData);
        }
        catch (err) {
            console.log(err);
        }
    })));
    passport_1.default.use('jwt', new JWTStrategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([jwt_1.extractCookie]),
        secretOrKey: process.env.SECRET_KEY
    }, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        done(null, jwt_payload);
    })));
    passport_1.default.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.default.findById(id);
        done(null, user);
    }));
};
exports.default = initializePassport;
