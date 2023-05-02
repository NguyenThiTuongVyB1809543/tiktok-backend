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
        const page = parseInt(req.query.page) || 1 || 2;
        const per_page = parseInt(req.query.per_page) || 10;
        const skip = (page - 1) * per_page;
        const limit = parseInt(per_page);

        Users.find().skip(skip).limit(limit)
            .then(users => res.json(users)); 
    }
    chongTreo(req, res, next) { //1 middleware nên có next() hoặc phải có res.send() nếu không sẽ bị treo 
        Users.find({})
            .then(user => res.json(
                user
                ))
            .catch(next);
    } 
 

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
        const idMe = res.locals.idUser;
        let userMeFollowing  = [];
        Users.findById({_id: idMe})
            .then((user) => {
                userMeFollowing = user.following;
                // console.log(userMeFollowing);
            })
            .then(() => {
                return Users.findOne({nickname: req.params.nickname}).populate('videos').exec()
            })
            
            .then(users => {
                if(userMeFollowing.includes(users._id.toString())){
                    users.is_followed = true;
                }
                res.json(users);
            })
            .catch(next);
 
        // Users.findOne({nickname: req.params.nickname}).populate('videos').exec()
        //     .then(user => res.json(user))
        //     .catch(err => {
        //         console.log('error: ', err);
        //     });

    }

    //[GET] /users/search?q=f&type=less
    searchUsersOnHeader(searchQuery, limit) {
        // perform search on header, return only `limit` number of results
        // return an array of user objects
        Users.find({searchQuery: searchQuery})
            .limit(limit)
            .then((users) => {
                resolve(users);
            }) 
            .catch(err => console.error('err searchUsersOnHeader: ',err));
    }
    searchUsersOnHeader(searchQuery, limit) {
        // perform search on header, return only `limit` number of results
        // return an array of user objects
        Users.find({searchQuery: searchQuery})
            .limit(limit)
            .then((users) => {
                resolve(users);
            }) 
            .catch(err => console.error('err searchUsersOnHeader: ',err));
    }
    searchUser(req, res, next) {
        const searchQuery = req.query.q;
        const searchType = req.query.type || 'less';
        console.log(searchQuery);
        let results;
        if (searchType === 'less') {
            // perform search on header, return only 5 results
            // results = searchUsersOnHeader(searchQuery, 5);
            Users.find({nickname: new RegExp(searchQuery, 'i')})
                .limit(5)
                .then((users) => {
                    res.json(users);
                }) 
                .catch(err => console.error('err searchUsersOnHeader: ',err));
          } 
        
    }

    // [Auth]
    // /users/:id/follow
    followAUser(req, res, next) { 
        const idOtherPeople = req.params.id; 
        const idMe = res.locals.idUser;
        // let is_followed = false;
      
        Users.findById( {_id: idMe} )
            .then((me) => {
                // console.log('me nè: ',me);
                if (!me) {
                    res.status(404).json({ message: 'User not found' });
                }
                
                if (me.following.includes(idOtherPeople)) {
                    res.status(400).json({ message: 'You are already following this user' });
                }

                me.following.push(idOtherPeople);
                me.followings_count++;
                // console.log('Mình nè: ',me);
                return me.save(); 
            })
            .then(() => {
                return Users.findById({_id: idOtherPeople});
              })
            .then((otherPeople) => {
                // console.log('otherPeople nè: ',otherPeople);

                if (!otherPeople) {
                    res.status(404).json({ message: 'User not found' });
                }
                 
                if (otherPeople.followers.includes(idMe)) {
                    res.status(400).json({ message: 'You are follower of this user' });
                }
                otherPeople.followers.push(idMe);
                otherPeople.followers_count++;
                // is_followed = true;
                // console.log('người ta nè: ',otherPeople);
                return otherPeople.save(); 
            })
            .then((user) => { 
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                user.is_followed = true; 
                res.json(user); 
            })
            .catch(next);
 
        
    }

    // [Auth]
    // /users/:id/unfollow
    unFollowAUser(req, res, next) {
        const idUnfollow = req.params.id; 
        // console.log('idOtherPeople: ', idUnfollow);
        const idMe = res.locals.idUser;
        // console.log('idMe: ', idMe);
         
        Users.findById( {_id: idMe} )
            .then((me) => {
                // console.log('me nè: ',me);
                if (!me) {
                    res.status(404).json({ message: 'User not found' });
                }
                
                if (!me.following.includes(idUnfollow)) {
                    res.status(400).json({ message: 'You are not following this user' });
                }

                me.following.pull(idUnfollow);
                me.followings_count--;
                // console.log('Mình nè: ',me);
                return me.save(); 
            })
            .then(() => {
                return Users.findById({_id: idUnfollow});
              })
            .then((otherPeople) => {
                // console.log('otherPeople nè: ',otherPeople);

                if (!otherPeople) {
                    res.status(404).json({ message: 'User not found' });
                }
                 
                if (!otherPeople.followers.includes(idMe)) {
                    res.status(400).json({ message: 'You are not follower of this user' });
                }
                otherPeople.followers.pull(idMe);
                otherPeople.followers_count--;
                
                // console.log('người ta nè: ',otherPeople);
                return otherPeople.save(); 
            })
            .then((user) => { 
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                user.is_followed = false;
                res.json(user); 
            })
            .catch(next);
            
             
        
         
    }

      
       

}

module.exports = new UserController();
