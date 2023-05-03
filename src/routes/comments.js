//để quản lí những cái router liên quan tới thằng auth
const express = require('express');
const router = express.Router();
const commentController = require('../app/controllers/CommentController');
const authMiddleware = require('../app/controllers/auth.middlewares');
// [Auth]
router.post('/:id/like', authMiddleware.isAuth, commentController.likeComment);

// [Auth]
router.post('/:id/unlike', authMiddleware.isAuth, commentController.unlikeComment);

// [Auth]
// router.patch('/1', commentController.updateComment);

// [Auth]
router.delete('/:id',   commentController.deleteComment); 

// router.get('/', commentController.index);

module.exports = router;
