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
exports.passportCall = exports.extractCookie = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const JWT_COOKIE_NAME = 'token';
function createToken(usuario) {
    const payload = {
        usuario
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY);
    return token;
}
exports.createToken = createToken;
const verifyToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).json({ message: 'Debes incluir la cabecera de autorización' });
    }
    const token = req.headers['authorization'];
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        next();
    }
    catch (_a) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
exports.verifyToken = verifyToken;
const extractCookie = (req) => {
    return (req && req.cookies) ? req.cookies[JWT_COOKIE_NAME] : null;
};
exports.extractCookie = extractCookie;
const passportCall = (strategy) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        passport_1.default.authenticate(strategy, function (err, user, info) {
            if (err)
                return next(err);
            if (!user)
                return next();
            req.user = user;
            next();
        })(req, res, next);
    });
};
exports.passportCall = passportCall;
