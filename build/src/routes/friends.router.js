"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friends_controllers_1 = require("../controllers/friends.controllers");
const router = express_1.default.Router();
router.get('/search', friends_controllers_1.searchUser);
router.get('/myfriends/:_id', friends_controllers_1.getFriends);
router.get('/friendsRequest/:userId', friends_controllers_1.getFriendsRequest);
router.post('/sendfriendrequest', friends_controllers_1.sendFriendRequest);
router.post('/acceptfriend', friends_controllers_1.acceptFriendRequest);
router.delete('/rejectfriend/:userId/:friendId', friends_controllers_1.rejectFriendRequest);
router.delete('/friend-delete/:userId/:friendId', friends_controllers_1.deleteFriend);
exports.default = router;
