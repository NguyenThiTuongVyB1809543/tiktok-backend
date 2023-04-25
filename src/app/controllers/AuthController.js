const Users = require('./../models/User'); 
const { mongooseToObject } = require('../../util/monggoose');
const { response, request } = require('express');  
const randToken = require('rand-token');
const bcrypt = require('bcrypt');
const jwtVariable = require('../../variables/jwt');
const {SALT_ROUNDS} = require('../../variables/auth');
const authMethod = require('./auth.methods');

class AuthController {
    //[POST] /auth/register
    register(req, res, next) {
      const { email, nickname, password, type } = req.body; 
      // const newUser = new Users(req.body);
      // Check if user with given email already exists
      Users.findOne({ email })
        .then(existingUser => {
          if (existingUser) {
            return res.status(409).json({ message: 'Email is already in use' });
          }   
        })
        .then(() => { 
          const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);
          const newUser = new Users({
            email: email,
            nickname: req.body.nickname,
            password: hashPassword,
          });
          newUser.save();
          res.json(newUser);
        }) 
        .catch(error => {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        });
    }
     
     


    //[POST] /auth/login
    // login(req, res, next){ 
    //     Users.findOne({ email: req.body.email, password: req.body.password })
    //         .then(user => res.json(user))
    //         .catch(next);
    // }
    login(req, res, next){ 
      const email = req.body.email;
      const password = req.body.password;
          Users.findOne({ email: email})
              // .then(user => res.json(user))
            
              .then((user) =>{
                if(email !== user.email){
                  return res.status(409).json({ message: 'Account does not exist' });
                }
                // console.log(user);
                const isPasswordValid = bcrypt.compareSync(password, user.password);
                if (!isPasswordValid) {
                  return res.status(401).send('Incorrect password');
                }
                const accessTokenLife =
		                    process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

                const accessTokenSecret =
                        process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

                const dataForAccessToken = {
                  _id: user._id,
                };
                authMethod.generateToken(
                  dataForAccessToken,
                  accessTokenSecret,
                  accessTokenLife,
                ).then((accessToken) => {
                  // console.log('dataForAccessToken: ' + JSON.stringify(dataForAccessToken));
                  // console.log('accessToken: ',accessToken);
                  if (!accessToken) {
                    return res
                      .status(401)
                      .send('Đăng nhập không thành công, vui lòng thử lại.');
                  }
                  return res.json({
                    msg: 'Đăng nhập thành công.',
                    data: user,
                    meta: {
                      token: accessToken
                    }, 
                  });
                }); 
              })
              .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
              });
          
      }
 
      
        

    //[POST] /auth/logout
    logout(req, res, next){
        res.send("logout success");

    }

    //[GET] /auth/me
    getCurrentUser(req, res, next){

    }


    // [Auth] auth/me/followings?page=1'    Get followings list
    getFollowingList(req, res, next){
      
      const page = req.query.page || 1;
      const perPage = 5; 
      console.log('page: ', page);
      // Users.find({ follower: userId })
      //   .skip((page - 1) * perPage)
      //   .limit(perPage)
      //   .populate('following', '_id username avatar')
      //   .then(followings => {
      //     const response = {
      //       followings: followings.map(following => {
      //         return {
      //           id: following.following._id,
      //           username: following.following.username,
      //           avatar: following.following.avatar
      //         };
      //       }),
      //       currentPage: page,
      //       totalPages: Math.ceil(followings.length / perPage)
      //     };
      //     res.status(200).json(response);
      //   })
      //   .catch(err => {
      //     console.error(err);
      //     res.status(500).json({ error: err });
      //   });
    }
     
    //[GET] /auth/
    index(req, res, next) {
        res.send('Auth Controller');
    }

}

module.exports = new AuthController();
