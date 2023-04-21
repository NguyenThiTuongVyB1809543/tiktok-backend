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

    // // [GET] /users/suggested?page=1&per_page=15
    getSuggestedUserList(req, res, next) {
        if(['1', '12'].includes(req.query.page )){
            if(['5','10', '15', '20'].includes(req.query.per_page )){  
                return next();
            } 
        }
        res.status(403).json({
            message: 'Access denied, khum cho vao'
        })
    }
    chongTreo(req, res, next) { //1 middleware nên có next() hoặc phải có res.send() nếu không sẽ bị treo 
        Users.find({})
            .then(user => res.json(
                user
                ))
            .catch(next);
    } 

    //[GET] /users/suggested
    // getSuggestedUserList(req, res, next) {
    //     Users.find({})
    //         .then(user => res.json(user))
    //         .catch(next);
    // }

    //[GET] /users/@:nickname
    // getAnUser = async (req, res) => {
    //     const { nickname } = req.params;
      
    //     // Look for a user with the provided nickname
    //     const user = await Users.findOne({ nickname });
      
    //     // If no user is found, return an error
    //     if (!user) {
    //       return res.status(404).json({ message: 'User not found' });
    //     }
      
    //     // If the user is found, return the user data
    //     res.status(200).json(user);
    // };  
    getAnUser (req, res, next) { 
        Users.findOne({nickname: req.params.nickname}). populate('videos').exec()
            .then(user => res.json(user))
            .catch(err => {
                console.log('error: ', err);
            });

    }
      
      
      
      
      
      



}

module.exports = new UserController();
