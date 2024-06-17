"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controllers_1 = require("../controllers/post.controllers");
const jwt_1 = require("../utils/jwt");
const router = express_1.default.Router();
router.get('/posts', post_controllers_1.getPost);
router.get('/postsbyid/:userId', (0, jwt_1.passportCall)('jwt'), post_controllers_1.getPostsById);
router.put('/edit-post/:postId/:userId', (0, jwt_1.passportCall)('jwt'), post_controllers_1.editPost);
router.post('/create-post/:_id', (0, jwt_1.passportCall)('jwt'), post_controllers_1.createPost);
router.delete('/delete-post/:postId/:userId', (0, jwt_1.passportCall)('jwt'), post_controllers_1.deletePost);
router.post('/like/:postId/:userId', (0, jwt_1.passportCall)('jwt'), post_controllers_1.like);
router.post('/dislike/:postId/:userId', (0, jwt_1.passportCall)('jwt'), post_controllers_1.dislike);
exports.default = router;
