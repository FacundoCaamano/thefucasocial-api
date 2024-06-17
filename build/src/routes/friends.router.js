"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friends_controllers_1 = require("../controllers/friends.controllers");
const jwt_1 = require("../utils/jwt");
const router = express_1.default.Router();
router.get('/search', friends_controllers_1.searchUser);
router.get('/myfriends/:_id', (0, jwt_1.passportCall)('jwt'), friends_controllers_1.getFriends);
router.get('/friendsRequest/:userId', (0, jwt_1.passportCall)('jwt'), friends_controllers_1.getFriendsRequest);
router.post('/sendfriendrequest', (0, jwt_1.passportCall)('jwt'), friends_controllers_1.sendFriendRequest);
router.post('/acceptfriend', (0, jwt_1.passportCall)('jwt'), friends_controllers_1.acceptFriendRequest);
router.delete('/rejectfriend/:userId/:friendId', (0, jwt_1.passportCall)('jwt'), friends_controllers_1.rejectFriendRequest);
router.delete('/friend-delete/:userId/:friendId', (0, jwt_1.passportCall)('jwt'), friends_controllers_1.deleteFriend);
exports.default = router;
