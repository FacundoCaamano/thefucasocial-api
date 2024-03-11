import express from 'express'
import { createComment, getCommentByPostId } from '../controllers/comment.controllers'

const router = express.Router()

router.post('/create-comment/:_id', createComment)
router.get('/get-comments/:_id', getCommentByPostId)

export default router