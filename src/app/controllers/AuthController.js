const Users = require('./../models/User'); 
const { mongooseToObject } = require('../../util/monggoose');
const { response } = require('express'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class AuthController {
    //[POST] /auth/register
    register(req, res, next) {
      const { email, nickname, password, type } = req.body; 
      const newUser = new Users(req.body);
      // Check if user with given email already exists
      Users.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(409).json({ message: 'Email is already in use' });
        }   
      })
      .then(() => { 
        newUser.save()
        res.json(newUser)
      }) 
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      });
    }
     
     


    //[POST] /auth/login
    login(req, res, next){ 
        Users.findOne({ email: req.body.email, password: req.body.password })
            .then(user => res.json(user))
            .catch(next);
    }
 
      
        

    //[POST] /auth/logout
    logout(req, res, next){
        res.send("logout success");

    }

    //[GET] /auth/me
     

     
    //[GET] /auth/
    index(req, res, next) {
        res.send('Auth Controller');
    }

}

module.exports = new AuthController();
