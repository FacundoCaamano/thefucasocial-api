"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    email: String,
    password: { type: String, required: true },
    createdAt: Date,
    friends: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User'
        }],
    friendsRequest: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
