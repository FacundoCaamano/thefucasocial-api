import express from 'express'
import { createPost, deletePost, getPost } from '../controllers/post.controllers'

const router = express.Router()

router.get('/posts', getPost)
router.post('/create-post/:_id', createPost)
router.delete('/delete-post/:_id', deletePost)

export default router