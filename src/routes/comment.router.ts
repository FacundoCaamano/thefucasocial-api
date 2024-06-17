import express from 'express'
import { createComment, deleteComment, dislikeComment, getCommentByPostId, likeComment } from '../controllers/comment.controllers'
import { passportCall } from '../utils/jwt'

const router = express.Router()

router.post('/create-comment', passportCall('jwt') ,createComment)
router.get('/get-comments/:_id', getCommentByPostId)
router.post('/like-comment',passportCall('jwt') , likeComment)
router.post('/dislike-comment', passportCall('jwt') ,dislikeComment)
router.delete('/delete-comment/:commentId/:userAuthorId',passportCall('jwt') ,deleteComment)
export default router