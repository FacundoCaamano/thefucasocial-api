"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    friendId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: String,
    timestamp: { type: Date, default: Date.now },
});
const messageModel = mongoose_1.default.model('Message', MessageSchema);
exports.default = messageModel;
