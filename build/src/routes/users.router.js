"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const jwt_1 = require("../utils/jwt");
const router = express_1.default.Router();
router.post('/register', user_controllers_1.register);
router.post('/login', user_controllers_1.login);
router.get('/userauth', (0, jwt_1.passportCall)('jwt'), (req, res) => {
    res.json(req.user);
});
router.put('/edit-user/:_id', user_controllers_1.updatedUser);
router.delete('/delete-user/:_id', user_controllers_1.deleteUser);
router.get('/logout', user_controllers_1.logout);
exports.default = router;
