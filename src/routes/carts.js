const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');
const authMiddleware = require('../app/controllers/auth.middlewares');
  
// [Auth]  
router.post('/', authMiddleware.isAuth, cartController.AddToCart); 
router.post('/inc_quantity', authMiddleware.isAuth, cartController.increaseProductQuantity); 
router.post('/dec_quantity', authMiddleware.isAuth, cartController.decreaseProductQuantity); 
router.post('/del_product_cart', authMiddleware.isAuth, cartController.deleteProductQuantity); 
router.get('/', authMiddleware.isAuth, cartController.getCart); 
 

module.exports = router;
