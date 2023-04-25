//để quản lí những cái router liên quan tới thằng video
const express = require('express');
const router = express.Router();
const videoController = require('../app/controllers/VideoController');

const authMiddleware = require('../app/controllers/auth.middlewares');


router.get('/show', videoController.showVideo);
router.get('/:id', videoController.getVideo);
// [Auth]
router.post('/', authMiddleware.isAuth, videoController.uploadVideo);
// /videos?type=for-you&page=1
router.get('/', videoController.getVideoList, videoController.chongTreo); 

// [Auth]
// /videos/12?_method=PATCH
// router.post('/12', videoController.updateVideo);

// [Auth]
// router.delete('/10', videoController.deleteVideo);

// [Auth]/videos/:id/like
// router.post('/:id/like', videoController.likeVideo);

// [Auth]
// router.post('/1/unlike', videoController.unlikeVideo);


// [Auth]
// /videos/49df7460-faaa-4739-9f02-ec6f80b5458d/comments
// router.post('/:id/comments', videoController.createCommentVideo);

// [Auth]
// router.get('/1/comments', videoController.getCommentsListVideo);

// [Auth]
// /videos
// router.post('/', videoController.createVideo);

module.exports = router;
