const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');
const authMiddleware = require('../app/controllers/auth.middlewares');
  
// [Auth]  
router.get('/purchase_history', authMiddleware.isAuth, orderController.getPurchaseHistory); 
router.post('/:id', authMiddleware.isAuth, orderController.orderApproval); 
router.get('/', authMiddleware.isAuth, orderController.getOrders); 
router.post('/', authMiddleware.isAuth, orderController.createOrder); 
  
 

module.exports = router;
