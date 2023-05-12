//để quản lí những cái router liên quan tới thằng video
const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const authMiddleware = require('../app/controllers/auth.middlewares');



// /users/search?q=f&type=less
router.get('/search', userController.searchUser);


// [Auth]
// /users/:id/follow
router.post('/:id/follow',authMiddleware.isAuth, userController.followAUser);
// [Auth]
// /users/:id/unfollow
router.post('/:id/unfollow',authMiddleware.isAuth, userController.unFollowAUser);
 
// /users/suggested?page=1&per_page=12
router.get('/suggested', userController.getSuggestedUserList  );

// /users/@sondnf8
router.get('/@:nickname',authMiddleware.isAuth, userController.getAnUser);
router.get('/:id',authMiddleware.isAuth, userController.getCurrentUser);
router.get('/@:nickname/products',authMiddleware.isAuth, userController.getAnUserProducts);

router.get('/show', userController.showUser);

module.exports = router;
