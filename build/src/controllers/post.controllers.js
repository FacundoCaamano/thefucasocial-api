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
exports.deletePost = exports.createPost = exports.getPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find();
        res.json(posts);
    }
    catch (_a) {
        console.log('error');
    }
});
exports.getPost = getPost;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const author = req.params._id;
        const newPost = {
            content,
            author,
            createAt: new Date()
        };
        yield post_model_1.default.create(newPost);
        res.json('creado');
    }
    catch (error) {
        console.log('error', error);
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params._id;
        const post = yield post_model_1.default.findById(postId);
        if (!post) {
            res.json({ message: 'no se encontro el post' });
        }
        yield post_model_1.default.deleteOne({ '_id': postId });
        res.json({ message: 'eliminado' });
    }
    catch (error) {
        console.log({ message: 'error al eliminar', error });
    }
});
exports.deletePost = deletePost;
