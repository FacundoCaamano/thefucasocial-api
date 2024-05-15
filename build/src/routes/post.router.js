"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controllers_1 = require("../controllers/post.controllers");
const router = express_1.default.Router();
router.get('/posts', post_controllers_1.getPost);
router.get('/postsbyid/:userId', post_controllers_1.getPostsById);
router.post('/create-post/:_id', post_controllers_1.createPost);
router.delete('/delete-post/:postId/:userId', post_controllers_1.deletePost);
router.post('/like/:postId/:userId', post_controllers_1.like);
router.post('/dislike/:postId/:userId', post_controllers_1.dislike);
exports.default = router;
