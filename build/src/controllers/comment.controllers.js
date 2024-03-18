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
exports.getCommentByPostId = exports.createComment = void 0;
const comment_model_1 = __importDefault(require("../models/comment.model"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body.content;
    const postId = req.body.post;
    const author = req.body.author;
    const newComment = {
        content,
        author,
        post: postId,
        createAt: new Date()
    };
    yield comment_model_1.default.create(newComment);
    res.json({ message: 'creado' });
});
exports.createComment = createComment;
const getCommentByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params._id;
        const comments = yield comment_model_1.default.find({ post: postId });
        if (!comments) {
            res.json({ message: 'no se encontraron comentarios' });
        }
        res.json({ message: 'comentarios obtenidos', comments });
    }
    catch (_a) {
        console.log('error');
    }
});
exports.getCommentByPostId = getCommentByPostId;
