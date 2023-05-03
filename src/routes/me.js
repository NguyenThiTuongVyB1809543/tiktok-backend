//để quản lí những cái router liên quan tới thằng auth
const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');
const authMiddleware = require('../app/controllers/auth.middlewares');
// [Auth]
// /me/followings?page=1
router.get('/followings',authMiddleware.isAuth, meController.getFollowingList); 

 

module.exports = router;
