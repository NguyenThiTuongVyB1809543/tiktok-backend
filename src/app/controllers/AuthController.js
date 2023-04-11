const Users = require('./../models/User');
const { mongooseToObject } = require('../../util/monggoose');
const { response } = require('express');
const User = require('./../models/User');

class AuthController {
    //[POST] /auth/register
    register(req, res, next){
        const user = new Users(req.body);
        user
            .save()
            .then(() => {
                res.send(req.body)
            })
            .catch(next)    
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
     
    //[GET] /auth/
    index(req, res, next) {
        res.send('Auth Controller');
    }

}

module.exports = new AuthController();
