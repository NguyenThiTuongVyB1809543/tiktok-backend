const Videos = require('./../models/Video');
const Users = require('./../models/User');
const { mongooseToObject } = require('../../util/monggoose');
const { response } = require('express');
const multer = require('multer');
const path = require('path');
const authMethod = require('./auth.methods');
const jwtVariable = require('../../variables/jwt');

class VideoController {
    //[GET] /videos/show
    showVideo(req, res, next) {
        Videos.find({})
            .then(video => res.json(video))
            .catch(next);
    }
    //[GET] /videos?type=for-you&page=1 
    
    // getVideoList(req, res, next) {
    //     Videos.find().populate('user').exec()
    //     .then(videos => {
    //       res.json(videos)
    //     })
    //     .catch(err => {
    //       console.log('error: ', err);
    //     });
    // }
    getVideoList(req, res, next) {
        if(['for-you'].includes(req.query.type )){
            if(['1', '2', '3', '4', '5'].includes(req.query.page )){  
                return next();
            } 
            return next();
        }
        res.status(403).json({
            message: 'Access denied, khum cho vao'
        })
    }
    chongTreo(req, res, next) { //1 middleware nên có next() hoặc phải có res.send() nếu không sẽ bị treo 
        // Videos.find({})
        //     .populate('user', 'nickname avatar')
        //     .then(video => res.json(video))
        //     .catch(next);
        Videos.find().populate('user').exec()
            .then(videos => {
                res.json(videos)
            })
            .catch(err => {
            console.log('error: ', err);
            });
    } 

    
    

    //[GET] /videos/:id
    getVideo(req, res, next) {
        Videos.findById({ _id:req.params.id })
            .then(video => res.json(video))
            .catch(next);
    }

    //upload video
    //[POST] /videos   
    uploadVideo(req, res, next) {   
        const  FormData = req.body;
        // console.log(FormData);
        const newVideo = new Videos({
            description: req.body.description,
            music: req.body.music,
            file_url: "http://localhost:3000/src/assets/video/" + req.body.namefile,
            user: req.body.userId

        })
        // console.log('newVideo: ',newVideo);
        newVideo.save()
        .then((video) =>{
            Users.findOneAndUpdate(req.body.userId, {$push: { videos: video._id }})
                .then((user) =>{
                    res.json(video);
                })
                .catch(next);
        })
        .catch(next)

       
    }
    

    //like video
    //[POST] /videos/:id/like 
    // likeVideo(req, res, next) {
    //     Video
    // }




}

module.exports = new VideoController();
