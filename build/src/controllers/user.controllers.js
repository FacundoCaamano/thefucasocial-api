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
exports.authUser = exports.deleteUser = exports.updatedUser = exports.logout = exports.loginPassportJwt = exports.login = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const encrypt_1 = require("../utils/encrypt");
const jwt_1 = require("../utils/jwt");
const passport_1 = __importDefault(require("passport"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
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
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(404).send('Usuario no encontrado');
        }
        else {
            const comparePass = yield (0, encrypt_1.comparePassword)(password, user.password);
            if (comparePass) {
                const token = (0, jwt_1.createToken)(user._id);
                res.cookie('tokencookie', token, { httpOnly: true });
                res.status(200).json(token);
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: 'error al loguear', err });
    }
});
exports.login = login;
const loginPassportJwt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.login(user, { session: false }, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(500).send(err);
            }
            const token = (0, jwt_1.createToken)(user._id);
            res.cookie('tokencookie', token, { httpOnly: true });
            return res.json({ token });
        }));
    })(req, res);
});
exports.loginPassportJwt = loginPassportJwt;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('tokencookie');
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
    catch (_a) {
        console.log('error');
    }
});
exports.deleteUser = deleteUser;
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el usuario está autenticado usando Passport
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        // Obtener el ID de usuario del objeto de usuario autenticado
        const userId = req.user._id;
        // Buscar al usuario en la base de datos usando el ID
        const user = yield user_model_1.default.findById(userId);
        if (user) {
            // Filtrar los datos del usuario que deseas enviar al cliente
            const userFilterData = {
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            };
            return res.json(userFilterData);
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
});
exports.authUser = authUser;
