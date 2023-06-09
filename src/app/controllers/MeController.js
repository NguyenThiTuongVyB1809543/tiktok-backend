const Users = require('../models/User'); 
const Products = require('../models/Product'); 
const { mongooseToObject } = require('../../util/monggoose');
const { response, request } = require('express');  
const randToken = require('rand-token');
const bcrypt = require('bcrypt');
const jwtVariable = require('../../variables/jwt');
const {SALT_ROUNDS} = require('../../variables/auth');
const authMethod = require('./auth.methods'); 
class AuthController {
  // [Auth]
  //[GET] /
  getCurrentUser(req, res, next) {
    const idMe = res.locals.idUser;
    Users.findById(idMe)
      .populate('videos')
      .exec()
      .then(user =>{
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      })
      .catch(next);
  }

  // [Auth]
  //[POST] /
  updateCurrentUser(req, res, next){
    const idMe = res.locals.idUser;
    const fullname = req.body.fullname; 
    const bio = req.body.bio;
    const avatar = "/src/assets/images/" + req.body.avatar;
    const userId = req.body.userId;
      
    Users.findOneAndUpdate({_id: idMe}, {$set: {fullname: fullname, bio: bio, avatar: avatar,  }}, { new: true })
      .then((user) => {
        res.json(user);
      })
      .catch(next);
  }

  // [Auth] /me/followings?page=1' Get followings list
  getFollowingList(req, res, next){ 
    const idMe = res.locals.idUser;
    let userMeFollowing  = [];
    const page = parseInt(req.query.page) || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9;
    Users.findById({ _id: idMe })
      .then((user) => {
          userMeFollowing = user.following; 
      })
      .then(() => {
          const userIDs = userMeFollowing.map((id) => id.toString());
          return Users.find({ _id: { $in: userIDs } }) 
      }) 
      .then(users => res.json(users)) 
      .catch(next);
  } 

  // [Auth] /me/followings/products Get product list
  getFollowingProductList(req, res, next){ 
    const idMe = res.locals.idUser; 
    // console.log('res.locals: ', res.locals);
    let userMeFollowing  = []; 
    Users.findById({ _id: idMe })
        .then((user) => {
            userMeFollowing = user.following; 
        })
        .then(() => {
            const userIDs = userMeFollowing.map((id) => id.toString());
            return Products.find({ user: { $in: userIDs } }).populate('user').sort({createdAt: 'desc'}).exec()
        })
        .then(products => {
            products.forEach((product) => {
                // console.log('video user: ', video.user._id);
                if(userMeFollowing.includes(product.user._id.toString())){
                  product.user.is_followed = true;
                }  
            }) 
             
            // console.log('products: ', products);
            res.json(products);
        })
        .catch(next);
         
  } 
   
     

}

module.exports = new AuthController();
