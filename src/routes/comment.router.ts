import express from 'express'
import { createComment, dislikeComment, getCommentByPostId, likeComment } from '../controllers/comment.controllers'

const router = express.Router()

router.post('/create-comment', createComment)
router.get('/get-comments/:_id', getCommentByPostId)
router.post('/like-comment', likeComment)
router.post('/dislike-comment', dislikeComment)
export default router