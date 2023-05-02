//để quản lí những cái router liên quan tới thằng auth
const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');
const authMiddleware = require('../app/controllers/auth.middlewares');
// [Auth]
// /me/followings?page=1
router.get('/followings', meController.getFollowingList); 

// [Auth]
// /users/3/follow
// router.post('/3/unfollow', meController.followUser);

// [Auth]
// /users/3/unfollow
// router.post('/3/unfollow', meController.unFollowUser); 
// [Auth] Get followings list
// router.get('/followings',authMiddleware.isAuth, meController.getFollowingList);
// router.post('/',authMiddleware.isAuth, meController.updateCurrentUser);
// router.get('/',authMiddleware.isAuth, meController.getCurrentUser);

// router.get('/', meController.index);

module.exports = router;
