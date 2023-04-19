//để quản lí những cái router liên quan tới thằng video
const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');




// /users/search?q=f&type=less
// router.get('/search', userController.searchUser);

// [Auth]
// router.get('/1/like-videos', userController.getVideoLikeByUser);

// router.get('/1/videos', userController.getVideoOfUser);

// /users/suggested?page=1&per_page=12
router.get('/suggested', userController.getSuggestedUserList, userController.chongTreo );
router.get('/suggested', userController.getSuggestedUserList  );

// /users/@sondnf8
router.get('/@:nickname', userController.getAnUser);

router.get('/show', userController.showUser);

module.exports = router;
