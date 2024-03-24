import express from 'express'
import { createPost, deletePost, getPost } from '../controllers/post.controllers'
import { verifyToken } from '../utils/jwt'

const router = express.Router()

router.get('/posts', getPost)
router.post('/create-post/:_id',verifyToken, createPost)
router.delete('/delete-post/:_id', deletePost)

export default router