"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(usario) {
    const payload = {
        token: usario
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
    }
    catch (_a) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};
exports.verifyToken = verifyToken;
