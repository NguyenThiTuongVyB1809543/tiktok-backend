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
    getAProduct(req, res, next) {
        const idProduct = req.params.id;
        Products.findOne({_id: idProduct})
            .then(product => { res.json(product)})
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
            .then((user) => res.json(user))
            .catch(next);
    }
    // [Auth] [POST] products/
    editProduct(req, res, next) { 
        const productId = req.body.productId;
        
        Products.findByIdAndUpdate({_id: productId}, { new: true })
            .then(product => {
                if(req.body.productName !== ''){
                    product.product_name = req.body.productName;
                }
                if(req.body.description !== ''){
                    product.description = req.body.description;
                }
                if(req.body.price !== ''){
                    product.price = req.body.price;
                }
                if(req.body.namefile !== ''){
                    product.product_img_url = "http://localhost:3000/src/assets/images/" + req.body.namefile;
                }
                product.save();

            })   
            .catch(next);
    }


    // [Auth] 
    // [DELETE] videos/:id
    deleteAProduct(req, res, next) {
        const productId = req.params.id; 
        const idMe = res.locals.idUser; 
        Products.findByIdAndDelete(productId)
            .then(() => {
                return Users.findOne( { _id: idMe } ) 
            })
            .then((user) =>{
                user.products.pull(productId);
                user.products_count--;
                user.save()
            }) 
            .then(() => {
                res.status(204).send();
            })
            .catch(next);
    }
     

}

module.exports = new CommentController();
