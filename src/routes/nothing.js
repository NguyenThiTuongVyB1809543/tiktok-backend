//để quản lí những cái router liên quan tới thằng auth
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const authController = require('../app/controllers/AuthController');
const Users = require('../app/models/User');
const Videos = require('../app/models/Video');

// @lan/videos/6441e9f44dfb50cc0548cdf0
// router.get('/@:nickname/videos/:id', authController.register); 
 

module.exports = router;
