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
exports.deleteFriend = exports.rejectFriendRequest = exports.acceptFriendRequest = exports.sendFriendRequest = exports.getFriendsRequest = exports.searchUser = exports.getFriends = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const getFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params._id;
    const user = yield user_model_1.default.findById(userId);
    try {
        if (!user) {
            res.status(404).json({ message: 'usuario no encontrado' });
        }
        if (user) {
            const friends = (yield user.populate('friends')).friends;
            const infoFriendsFilter = friends.map((friend) => ({
                _id: friend._id,
                name: friend.name,
                email: friend.email
            }));
            res.status(200).json(infoFriendsFilter);
        }
    }
    catch (err) {
        console.log('error en el servidor', { message: err });
    }
});
exports.getFriends = getFriends;
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    try {
        if (!query) {
            return res.status(400).json({ message: 'No se proporcionó ningún término de búsqueda' });
        }
        const users = yield user_model_1.default.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }
            ]
        }).select('name');
        res.status(200).json(users);
    }
    catch (err) {
        console.error('Error en el servidor', { message: err });
        res.status(500).json({ message: 'Error en el servidor' });
    }
});
exports.searchUser = searchUser;
const getFriendsRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield user_model_1.default.findById(userId).populate('friendsRequest', 'name');
    try {
        const friendsRequests = user === null || user === void 0 ? void 0 : user.friendsRequest;
        res.status(200).json(friendsRequests);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getFriendsRequest = getFriendsRequest;
const sendFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const friendId = req.body.friendId;
    try {
        const user = yield user_model_1.default.findById(userId);
        const friend = yield user_model_1.default.findById(friendId);
        if (!friend || !user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(userId) || !mongoose_1.default.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: 'Invalid User ID or Friend ID' });
        }
        if (friend.friendsRequest.includes(userId)) {
            return res.status(400).json({ message: 'Request already sent' });
        }
        friend.friendsRequest.push(userId);
        yield friend.save();
        res.status(200).json({ message: 'Friend request sent' });
    }
    catch (err) {
        console.error('Error in sendFriendRequest:', err);
        res.status(500).json({ message: 'Server error', err });
    }
});
exports.sendFriendRequest = sendFriendRequest;
const acceptFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const friendId = req.body.friendId;
    try {
        const user = yield user_model_1.default.findById(userId);
        const friend = yield user_model_1.default.findById(friendId);
        if (user && friend) {
            user.friends.push(friend._id);
            friend.friends.push(user._id);
            user.friendsRequest = user.friendsRequest.filter(_id => _id.toString() !== friendId);
            user.save();
            friend.save();
            res.status(200).json({ message: "solicitud aceptada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "error en el servidor", error });
    }
});
exports.acceptFriendRequest = acceptFriendRequest;
const rejectFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
    const user = yield user_model_1.default.findById(userId);
    const friend = yield user_model_1.default.findById(friendId);
    if (!user || !friend) {
        res.status(404).json({ message: 'no encontrado' });
    }
    if (user) {
        user.friendsRequest = user.friendsRequest.filter(_id => _id.toString() !== friendId);
        user.save();
        res.status(200).json({ message: 'solicitud rechazada' });
    }
});
exports.rejectFriendRequest = rejectFriendRequest;
const deleteFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friendId = req.params.friendId;
    const userId = req.params.userId;
    try {
        const user = yield user_model_1.default.findById(userId).populate('friends', '_id name email');
        const friend = yield user_model_1.default.findById(friendId).populate('friends', '_id name email');
        if (!user)
            res.status(404).json({ message: 'usuario no encontrado' });
        if (user) {
            user.friends = user.friends.filter((f) => f._id.toString() !== friendId);
            user.save();
            if (friend) {
                friend.friends = friend === null || friend === void 0 ? void 0 : friend.friends.filter((f) => f._id.toString() !== userId);
                friend === null || friend === void 0 ? void 0 : friend.save();
            }
            res.send(user.friends);
        }
    }
    catch (err) {
        res.status(400).json({ message: "error", err });
    }
});
exports.deleteFriend = deleteFriend;
