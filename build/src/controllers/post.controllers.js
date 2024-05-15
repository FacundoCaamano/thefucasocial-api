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
exports.dislike = exports.like = exports.deletePost = exports.createPost = exports.getPostsById = exports.getPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find().sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getPost = getPost;
const getPostsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const posts = yield post_model_1.default.find({ authorId: userId });
        res.json(posts);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getPostsById = getPostsById;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, authorName } = req.body;
        const authorId = req.params._id;
        const newPost = {
            content,
            authorId,
            authorName,
            createdAt: new Date()
        };
        const postCreate = yield post_model_1.default.create(newPost);
        res.json(postCreate);
    }
    catch (error) {
        console.log('error', error);
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;
        const post = yield post_model_1.default.findById(postId);
        if (!post) {
            res.json({ message: 'no se encontro el post' });
        }
        if ((post === null || post === void 0 ? void 0 : post.authorId) == userId) {
            yield post_model_1.default.deleteOne({ '_id': postId });
        }
        res.json({ message: 'eliminado' });
    }
    catch (error) {
        console.log({ message: 'error al eliminar', error });
    }
});
exports.deletePost = deletePost;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const postId = req.params.postId;
        const post = yield post_model_1.default.findById(postId);
        const userId = req.params.userId;
        if (!post) {
            return res.status(404).json({ message: ' no se econtro el post' });
        }
        if ((_a = post.likes) === null || _a === void 0 ? void 0 : _a.includes(userId)) {
            post.likes.pull(userId);
        }
        else {
            post.likes.push(userId);
        }
        if (post.dislikes.includes(userId)) {
            post.dislikes.pull(userId);
        }
        yield post.save();
        res.json({ message: 'Like actualizado' });
    }
    catch (error) {
        console.log({ message: 'Error al actualizar like', error });
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.like = like;
const dislike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const postId = req.params.postId;
        const post = yield post_model_1.default.findById(postId);
        const userId = req.params.userId;
        if (!post) {
            return res.status(404).json({ message: ' no se econtro el post' });
        }
        if ((_b = post.dislikes) === null || _b === void 0 ? void 0 : _b.includes(userId)) {
            post.dislikes.pull(userId);
        }
        else {
            post.dislikes.push(userId);
        }
        if (post.likes.includes(userId)) {
            post.likes.pull(userId);
        }
        yield post.save();
        res.json({ message: 'Like actualizado' });
    }
    catch (error) {
        console.log({ message: 'Error al actualizar like', error });
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.dislike = dislike;
