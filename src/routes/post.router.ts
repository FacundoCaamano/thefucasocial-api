import express from 'express'
import { createPost, deletePost, dislike, getPost, getPostsById, like } from '../controllers/post.controllers'
import { passportCall } from '../utils/jwt'

const router = express.Router()

router.get('/posts', getPost)
router.get('/postsbyid/:userId', getPostsById)
router.post('/create-post/:_id', passportCall('jwt'),createPost)
router.delete('/delete-post/:postId/:userId',passportCall('jwt'),deletePost)
router.post('/like/:postId/:userId',like)
router.post('/dislike/:postId/:userId',dislike)
export default router