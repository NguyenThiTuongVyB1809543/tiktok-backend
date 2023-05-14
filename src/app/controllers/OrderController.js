const Videos = require('../models/Video');
const Users = require('../models/User');
const Comments = require('../models/Comment');
const Products = require('../models/Product');
const Carts = require('../models/Cart');
const Orders = require('../models/Order');
const Notifications = require('../models/Notification');
const { mongooseToObject } = require('../../util/monggoose');
const { response } = require('express');
const multer = require('multer');
const path = require('path');
const authMethod = require('./auth.methods');
const jwtVariable = require('../../variables/jwt');
const Video = require('../models/Video');

class OrderController {
     
  // [Auth] [POST] orders/
  createOrder(req, res, next) {
    const userId  = res.locals.idUser;
    // Get all products in the user's cart
    Carts.find({ user: userId })
      .populate('products')
      .then((cartItems) => {
        // Group products by seller
        const sellerGroups = {};
        cartItems.forEach((cartItem) => {
          const sellerId = cartItem.products.user.toString();
          if (!sellerGroups[sellerId]) {
            sellerGroups[sellerId] = [];
          }
          sellerGroups[sellerId].push(cartItem);
        });
  
        // Save orders for each seller
        const orders = [];
        const orderPromises = [];
        for (const sellerId in sellerGroups) {
          const sellerItems = sellerGroups[sellerId];
          const totalPrice = sellerItems.reduce(
            (acc, item) => acc + item.products.price * item.quantity,
            0
          );
  
          const order = new Orders({
            user: userId,
            seller: sellerId,
            products: sellerItems.map((item) => ({
              product: item.products._id,
              quantity: item.quantity,
              price: item.products.price,
            })),
            totalPrice: totalPrice,
          });
  
          orders.push(order);
          orderPromises.push(order.save());
        }
  
        // Remove products from cart
        const removePromises = cartItems.map((cartItem) => Carts.findByIdAndRemove(cartItem._id));
  
        // Wait for all promises to resolve
        return Promise.all([
          ...orderPromises,
          ...removePromises,
        ]);
      })
      .then(() => {
        res.status(200).send('Orders saved successfully');
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('An error occurred while saving orders');
      });
  }
  
  getPurchaseHistory(req, res, next) {
    const userId = res.locals.idUser; 
    Orders.find({ user: userId })
      .populate('seller')
      .populate('products.product').sort({createdAt: 'desc'})
      .then((orders) => {
        res.status(200).json(orders);
        // console.log("lịch sữ mua hàng: ", orders);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('An error occurred while retrieving purchase history');
      });
  }

  getOrders(req, res, next) {
    const userId = res.locals.idUser; 
    Orders.find({ seller: userId })
      .populate('user')
      .populate('products.product').sort({createdAt: 'desc'})
      .then((orders) => {
        res.status(200).json(orders);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('An error occurred while getting orders');
      });

  }

  orderApproval(req, res, next) {
    const userId = res.locals.idUser;  
    const orderId = req.params.id; 
  
    Orders.findByIdAndUpdate(orderId, { status: 'sprocessing' })
      .populate('user')
      .populate('products.product')
      .then((orders) => {
        res.status(200).send('Edit status successfully');
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('An error');
      }); 
  }
  





}

module.exports = new OrderController();
