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
exports.users = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_router_1 = __importDefault(require("./src/routes/users.router"));
const post_router_1 = __importDefault(require("./src/routes/post.router"));
const comment_router_1 = __importDefault(require("./src/routes/comment.router"));
const friends_router_1 = __importDefault(require("./src/routes/friends.router"));
const message_router_1 = __importDefault(require("./src/routes/message.router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = __importDefault(require("./src/config/passport.config"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const message_model_1 = __importDefault(require("./src/models/message.model"));
require('dotenv').config();
const cors = require('cors');
const corsOptions = {
    credentials: true
};
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        methods: ["GET", "POST"],
        credentials: true
    }
});
app.use(cors(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
(0, passport_config_1.default)();
app.use('/thefucasocial', users_router_1.default);
app.use('/thefucasocial', post_router_1.default);
app.use('/thefucasocial', comment_router_1.default);
app.use('/thefucasocial', friends_router_1.default);
app.use('/thefucasocial', message_router_1.default);
const mongo_uri = process.env.MONGO_URI;
exports.users = new Map();
if (mongo_uri) {
    mongoose_1.default.connect(mongo_uri, {
        dbName: 'theFucaSocial'
    });
    mongoose_1.default.connection.on('connected', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('conectado a la base');
        server.listen(3000, () => {
            console.log('servidor corriendo en 3000');
        });
    }));
}
exports.io.on('connection', (socket) => {
    socket.on('register', (userId) => {
        if (userId) {
            exports.users.set(userId, socket.id);
            console.log(`Usuario ${userId} registrado con socket ID: ${socket.id}`);
            console.log(exports.users);
        }
        else {
            console.log('User ID no proporcionado para el registro');
        }
    });
    socket.on('sendFriendRequest', (data) => {
        console.log('Datos recibidos para enviar solicitud de amistad:', data);
        const friendSocketId = exports.users.get(data.friendId);
        console.log(`Socket ID para friendId ${data.friendId}:`, friendSocketId);
        if (friendSocketId) {
            exports.io.to(friendSocketId).emit('friendRequestReceived', { userId: data.userId });
            console.log(`Solicitud de amistad emitida al socket ID: ${friendSocketId}`);
        }
        else {
            console.log('El amigo no está conectado.');
        }
    });
    socket.on('disconnect', () => {
        console.log('Usuario desconectado: ', socket.id);
        exports.users.forEach((id, userId) => {
            if (id === socket.id) {
                exports.users.delete(userId);
                console.log(`Usuario ${userId} eliminado del registro de usuarios.`);
            }
        });
    });
    socket.on('sendMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, userName, friendId, message } = data;
        try {
            const createMessage = yield message_model_1.default.create({ userId, userName, message, friendId });
            const friendSocketId = exports.users.get(friendId);
            if (friendSocketId) {
                exports.io.to(friendSocketId).emit('newMessage', createMessage);
            }
        }
        catch (err) {
            console.error('Error creando mensaje:', err);
        }
    }));
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});
exports.default = app;
