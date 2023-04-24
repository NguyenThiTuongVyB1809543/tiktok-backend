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
 
        // if(['1', '12'].includes(req.query.page )){
        //     if(['5','10', '15', '20'].includes(req.query.per_page )){  
        //         return next();
        //     } 
        // }
        // res.status(403).json({
        //     message: 'Access denied, khum cho vao'
        // })
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
        //   else if (searchType === 'more') {
        //     // perform search on search page, paginate results
        //     const page = parseInt(req.query.page) || 1;
        //     const resultsPerPage = 10;
        //     const startIndex = (page - 1) * resultsPerPage;
        //     const endIndex = page * resultsPerPage;
        //     const allResults =   searchUsersOnSearchPage(searchQuery);
        //     results = allResults.slice(startIndex, endIndex);
        //   } else {
        //     return res.status(400).json({ message: 'Invalid search type' });
        //   }
        //   return res.json(results);
    }
      
      
      
      
      
      



}

module.exports = new UserController();
