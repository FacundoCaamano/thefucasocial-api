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
exports.createMessages = exports.getMessages = void 0;
const message_model_1 = __importDefault(require("../models/message.model"));
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
    try {
        const message = yield message_model_1.default.find({
            $or: [
                { userId, friendId },
                { userId: friendId, friendId: userId }
            ]
        }).sort('timestamp');
        res.json(message);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.getMessages = getMessages;
const createMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, userName, friendId, message } = req.body;
    try {
        console.log(userId, userName, friendId, message);
        const createMessage = yield message_model_1.default.create({ userId, userName, message, friendId });
        res.status(201).send(createMessage);
    }
    catch (err) {
        res.status(500).send({ message: 'error cuack', err });
    }
});
exports.createMessages = createMessages;
