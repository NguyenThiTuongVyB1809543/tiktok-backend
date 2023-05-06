const Videos = require('../models/Video');
const Users = require('../models/User');
const Comments = require('../models/Comment');
const Products = require('../models/Product');
const Notifications = require('../models/Notification');
const { mongooseToObject } = require('../../util/monggoose');
const { response } = require('express');
const multer = require('multer');
const path = require('path');
const authMethod = require('./auth.methods');
const jwtVariable = require('../../variables/jwt');
const Video = require('../models/Video');

class CommentController {
    // [Auth] [GET] products/show
    getListProduct(req, res, next) {
        
    }
    // [Auth] [POST] products/
    postProduct(req, res, next) {
        const  FormData = req.body;
        const newProduct = new Products({

            product_name: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            product_img_url: "http://localhost:3000/src/assets/images/" + req.body.namefile,
            user: req.body.userId

        })
        // console.log('newVideo: ',newVideo);
        newProduct.save() 
        Users.findOne( { _id: req.body.userId } )
            .then((user) =>{
                user.products.push(newProduct._id)
                user.products_count++;
                user.save() 
            })
            // .then(()=>{
            //     return Users.findOne( { _id: req.body.userId }).populate('products').exec()
            // }) 
            then((user) => res.json(user))
            .catch(next);
    }
     

}

module.exports = new CommentController();
