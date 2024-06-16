import express from 'express'
import { createComment, deleteComment, dislikeComment, getCommentByPostId, likeComment } from '../controllers/comment.controllers'

const router = express.Router()

router.post('/create-comment', createComment)
router.get('/get-comments/:_id', getCommentByPostId)
router.post('/like-comment', likeComment)
router.post('/dislike-comment', dislikeComment)
router.delete('/delete-comment/:commentId/:userAuthorId', deleteComment)
export default router