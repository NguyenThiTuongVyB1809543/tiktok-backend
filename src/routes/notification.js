//để quản lí những cái router liên quan tới thằng video
const express = require('express');
const router = express.Router();
const notificationController = require('../app/controllers/NotificationController');
const authMiddleware = require('../app/controllers/auth.middlewares');

 
// [Auth]
// /notifications/:id
router.get('/',authMiddleware.isAuth, notificationController.getListNotification);
 
 

module.exports = router;
