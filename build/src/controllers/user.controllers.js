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
exports.deleteUser = exports.updatedUser = exports.getUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Crear un nuevo usuario
        const newUser = new user_model_1.default({
            name,
            email,
            password,
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
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find();
    res.json(users);
});
exports.getUsers = getUsers;
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
