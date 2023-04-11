//để quản lí những cái router liên quan tới thằng auth
const express = require('express');
const router = express.Router();
const commentController = require('../app/controllers/CommentController');

// [Auth]
// router.post('/5/like', commentController.likeComment);

// [Auth]
// router.post('/4/unlike', commentController.unlikeComment);

// [Auth]
// router.patch('/1', commentController.updateComment);

// [Auth]
// router.delete('/1', commentController.deleteComment); 

// router.get('/', commentController.index);

module.exports = router;
