//để quản lí những cái router liên quan tới thằng auth
const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const authMiddleware = require('../app/controllers/auth.middlewares');
  
// [Auth]
router.post('/', authMiddleware.isAuth, productController.postProduct);
router.get('/show', authMiddleware.isAuth, productController.getListProduct);
 

module.exports = router;
