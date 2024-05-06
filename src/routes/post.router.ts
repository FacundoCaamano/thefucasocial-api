import express from 'express'
import { createPost, deletePost, dislike, getPost, like } from '../controllers/post.controllers'
import { verifyToken } from '../utils/jwt'

const router = express.Router()

router.get('/posts', getPost)
router.post('/create-post/:_id', createPost)
router.delete('/delete-post/:_id', deletePost)
router.post('/like/:postId/:userId',like)
router.post('/dislike/:postId/:userId',dislike)
export default router