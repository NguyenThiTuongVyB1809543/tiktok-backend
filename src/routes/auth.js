//để quản lí những cái router liên quan tới thằng auth
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const authController = require('../app/controllers/AuthController');
const User = require('../app/models/User');


router.post('/register', authController.register); 
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// [Auth]
// /auth/me?_method=PATCH
// router.post('/me', authController.updateCurrentUser);

// [Auth]
// router.get('/me', authController.getCurrentUser);

router.get('/', authController.index);

module.exports = router;
