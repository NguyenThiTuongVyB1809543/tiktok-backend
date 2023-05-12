const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const authMiddleware = require('../app/controllers/auth.middlewares');
  
// [Auth] 
router.get('/:id',  productController.getAProduct);
router.delete('/:id',authMiddleware.isAuth,  productController.deleteAProduct);
router.post('/', authMiddleware.isAuth, productController.postProduct);
router.post('/edit', authMiddleware.isAuth, productController.editProduct);
 

module.exports = router;
