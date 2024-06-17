import express from 'express'
import { createPost, deletePost, dislike, editPost, getPost, getPostsById, like } from '../controllers/post.controllers'
import { passportCall } from '../utils/jwt'

const router = express.Router()

router.get('/posts', getPost)
router.get('/postsbyid/:userId', passportCall('jwt') ,getPostsById)
router.put('/edit-post/:postId/:userId', passportCall('jwt'),editPost)
router.post('/create-post/:_id', passportCall('jwt'),createPost)
router.delete('/delete-post/:postId/:userId',passportCall('jwt'),deletePost)
router.post('/like/:postId/:userId',passportCall('jwt'),like)
router.post('/dislike/:postId/:userId',passportCall('jwt'),dislike)

export default router