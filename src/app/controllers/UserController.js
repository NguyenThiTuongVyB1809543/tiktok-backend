const Users = require('./../models/User');
const { mongooseToObject } = require('../../util/monggoose');
const { response } = require('express');

class UserController {
    //[GET] /users/show
    showUser(req, res, next) {
        Users.find({})
            .then(user => res.json(user))
            .catch(next);
    }

    //[GET] /users/suggested
    getSuggestedUserList(req, res, next) {
        Users.find({})
            .then(user => res.json(user))
            .catch(next);
    }

    //[GET] /users/@:nickname
    getAnUser(req, res, next) {
        Users.findOne({nickname: req.params.nickname})
            .then(user => res.json(user))
            .catch(next);
    }



}

module.exports = new UserController();
