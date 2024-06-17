"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controllers_1 = require("../controllers/comment.controllers");
const jwt_1 = require("../utils/jwt");
const router = express_1.default.Router();
router.post('/create-comment', (0, jwt_1.passportCall)('jwt'), comment_controllers_1.createComment);
router.get('/get-comments/:_id', comment_controllers_1.getCommentByPostId);
router.post('/like-comment', (0, jwt_1.passportCall)('jwt'), comment_controllers_1.likeComment);
router.post('/dislike-comment', (0, jwt_1.passportCall)('jwt'), comment_controllers_1.dislikeComment);
router.delete('/delete-comment/:commentId/:userAuthorId', (0, jwt_1.passportCall)('jwt'), comment_controllers_1.deleteComment);
exports.default = router;
