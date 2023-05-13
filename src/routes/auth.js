//để quản lí những cái router liên quan tới thằng auth
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const authController = require('../app/controllers/AuthController');
const User = require('../app/models/User');
const authMiddleware = require('../app/controllers/auth.middlewares');


router.post('/register', authController.register); 
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// [Auth]
// /auth/update
// router.post('/update',authMiddleware.isAuth, authController.updateCurrentUser);
router.post('/update',  authController.updateCurrentUser);
router.post('/edit_address',  authController.editAddressCurrentUser);
 
// [Auth] Get followings list
// router.get('/me/followings',authMiddleware.isAuth, authController.getFollowingList);

// router.get('/me ',authMiddleware.isAuth, authController.getCurrentUser);

router.get('/', authController.index);

module.exports = router;
