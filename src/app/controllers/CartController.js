const Videos = require('../models/Video');
const Users = require('../models/User');
const Comments = require('../models/Comment');
const Products = require('../models/Product');
const Carts = require('../models/Cart');
const Notifications = require('../models/Notification');
const { mongooseToObject } = require('../../util/monggoose');
const { response } = require('express');
const multer = require('multer');
const path = require('path');
const authMethod = require('./auth.methods');
const jwtVariable = require('../../variables/jwt');
const Video = require('../models/Video');

class CartController {
     
    // [Auth] [POST] carts/
    AddToCart(req, res, next) {
        const productId = req.body._id;
        const meId = res.locals.idUser;
      
        Carts.findOne({ products: productId, user: meId }).exec()
          .then(cart => {
            if (cart) {
              // If cart already exists, increment quantity by 1
              cart.quantity += 1;
              return cart.save();
            } else {
              // If cart doesn't exist, create a new cart with quantity 1
              const newCart = new Carts({
                products: productId,
                user: meId,
                quantity: 1
              });
              return newCart.save();
            }
          })
          .then(() => {
            res.status(204).send();
          })
          .catch(err => {
            next(err);
          });
    }

    // [Auth] [GET] carts/
    getCart(req, res, next) {
        const meId = res.locals.idUser;
        Carts.find({ user: meId })
            .populate({
                path: 'products',
                populate: {
                    path: 'user'
                }
            })
            .then((carts) => {
                const productsBySeller = carts.reduce((acc, cart) => {
                    const sellerId = cart.products.user._id.toString();
                    const sellerName = cart.products.user.fullname;
                    const sellerNickname = cart.products.user.nickname;
                    const sellerAvatar = cart.products.user.avatar;
                    const quantity = cart.quantity;
                    const productId = cart.products._id.toString();
                    const productName = cart.products.product_name;
                    const productImg = cart.products.product_img_url;
                    const productDescription = cart.products.description;
                    const productPrice = cart.products.price;
                   
                    if (!acc[sellerId]) {
                      acc[sellerId] = { 
                        sellerName,
                        sellerNickname,
                        sellerAvatar,
                        products: []
                      };
                    }
                  
                    acc[sellerId].products.push({
                      productId,
                      productName,
                      productPrice,
                      quantity,
                      sellerName, 
                      productImg,
                      productDescription
                    });
                  
                    return acc;
                  }, {});

                res.json(productsBySeller);
            })
            .catch((err) => next(err)); 
    } 
    // [Auth] [POST] carts/inc_quantity
    increaseProductQuantity(req, res, next) {
    const productId = req.body.productId;
    const meId = res.locals.idUser; 
    Carts.findOneAndUpdate({ products: productId, user: meId }, {$inc: { quantity: 1 }}, { new: true }).exec()
        
        .then((cart) => {
        // console.log('cart: ', cart);
        res.status(204).send();
        })
        .catch(err => {
        next(err);
        });
    }

    // [Auth] [POST] carts/dec_quantity
    decreaseProductQuantity(req, res, next) {
        const productId = req.body.productId;
        const meId = res.locals.idUser;
        Carts.findOne({ products: productId, user: meId }).exec()
            .then((cart) => {
                if (!cart) {
                    throw new Error("Cart not found");
                }
                if (cart.quantity === 1) {
                    // remove the product from the cart if its quantity is 1
                    res.status(204).send();
                } else {
                    // decrease the quantity of the product by 1
                    cart.quantity--;
                    return cart.save();
                }
            })
            .then(() => {
                res.status(204).send();
            })
            .catch((err) => {
                next(err);
            });
         
    }
    // [Auth] [POST] carts/dec_quantity
    deleteProductQuantity(req, res, next) {
        const productId = req.body.productId;
        const meId = res.locals.idUser;
        // console.log('productId: ' + productId);
        // console.log('meId: ' + meId);
        Carts.findOneAndDelete({ products: productId, user: meId }).exec()
            .then((cart) => {
                if (!cart) {
                    throw new Error("Cart not found");
                } 
            })
            .then(() => {
                res.status(204).send();
            })
            .catch((err) => {
                next(err);
            });
         
    }
}

module.exports = new CartController();
