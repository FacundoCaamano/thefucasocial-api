"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_controllers_1 = require("../controllers/messages.controllers");
const jwt_1 = require("../utils/jwt");
const router = express_1.default.Router();
router.get('/messages/:userId/:friendId', (0, jwt_1.passportCall)('jwt'), messages_controllers_1.getMessages);
//router.post('/create-message',passportCall('jwt'),createMessages)
exports.default = router;
