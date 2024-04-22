"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post('/create-user', user_controllers_1.createUser);
router.post('/login', user_controllers_1.login);
router.get('/profile/:_id', passport_1.default.authenticate("jwt", { session: false }), user_controllers_1.profile);
router.put('/edit-user/:_id', user_controllers_1.updatedUser);
router.delete('/delete-user/:_id', user_controllers_1.deleteUser);
router.get('/logout', user_controllers_1.logout);
exports.default = router;
