"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const router = express_1.default.Router();
router.post('/create-user', user_controllers_1.createUser);
router.post('/login', user_controllers_1.login);
router.post('/auth-check', user_controllers_1.authUser);
router.get('/users', user_controllers_1.getUsers);
router.put('/edit-user/:_id', user_controllers_1.updatedUser);
router.delete('/delete-user/:_id', user_controllers_1.deleteUser);
exports.default = router;
