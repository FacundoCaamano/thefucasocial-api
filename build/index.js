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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_router_1 = __importDefault(require("./src/routes/users.router"));
const post_router_1 = __importDefault(require("./src/routes/post.router"));
const comment_router_1 = __importDefault(require("./src/routes/comment.router"));
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};
const app = (0, express_1.default)();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express_1.default.json());
app.use('/thefucasocial', users_router_1.default);
app.use('/thefucasocial', post_router_1.default);
app.use('/thefucasocial', comment_router_1.default);
const mongo_uri = process.env.MONGO_URI;
if (mongo_uri) {
    mongoose_1.default.connect(mongo_uri, {
        dbName: 'theFucaSocial'
    });
    mongoose_1.default.connection.on('connected', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('conectado a la base');
        app.listen(3000, () => {
            console.log('servidor corriendo en 3000');
        });
    }));
}
mongoose_1.default.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});
