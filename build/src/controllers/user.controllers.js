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
exports.deleteUser = exports.updatedUser = exports.logout = exports.profile = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const passport_1 = __importDefault(require("passport"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('register', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el registro' });
        }
        if (!user) {
            return res.status(400).json({ error: info.message });
        }
        return res.status(200).json({ message: 'Registro exitoso', user });
    })(req, res, next);
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('login', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el inicio de sesión' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        const token = (0, jwt_1.createToken)(user);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        return res.status(200).json(user);
    })(req, res, next);
});
exports.login = login;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params._id;
    try {
        const user = yield user_model_1.default.find({ _id: userId });
        if (!user)
            return res.status(400).json({ message: 'usuario no existente' });
        if (user)
            return res.status(200).json(user);
    }
    catch (_a) {
    }
});
exports.profile = profile;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'none',
        secure: true, // Solo si estás en HTTPS
    });
    res.json({ message: 'deslogueado' });
});
exports.logout = logout;
const updatedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params._id;
    const userData = req.body;
    const userEdit = {
        name: userData.name,
        email: userData.email
    };
    yield user_model_1.default.findByIdAndUpdate(userId, userData);
    res.json({ message: 'actualizado' });
});
exports.updatedUser = updatedUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params._id;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.json({ message: 'no existe este usuario' });
        }
        yield user_model_1.default.findByIdAndDelete(userId);
        res.json({ message: 'Eliminado' });
    }
    catch (_b) {
        console.log('error');
    }
});
exports.deleteUser = deleteUser;
