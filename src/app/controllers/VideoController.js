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
        Videos.find({}).populate('user').sort({createdAt: 'desc'}).exec()
            .then(video => res.json(video))
            .catch(next);
    }
    //[GET] /videos/unlogin?type=for-you&page=1  
    getVideoList(req, res, next) {
         
    }
     

    //[GET] /videos?type=for-you&page=1  
    getVideoListAuth(req, res, next) {
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
    chongTreoAuth(req, res, next) { //1 middleware nên có next() hoặc phải có res.send() nếu không sẽ bị treo 
        const idMe = res.locals.idUser;
        // console.log(idMe);
        let userMeFollowing  = [];
        let videoMeLike  = [];
        if(idMe != undefined){ 
            Users.findById({ _id: idMe })
                .then((user) => {
                    userMeFollowing = user.following;
                    videoMeLike = user.likedVideos;
                    // console.log('videoMeLike: ', videoMeLike);
                })
                .then(() => {
                    return Videos.find().populate('user').sort({createdAt: 'desc'}).exec()
                })
                .then(videos => {
                    videos.forEach((video) => {
                        // console.log('video user: ', video.user._id);
                        if(userMeFollowing.includes(video.user._id.toString())){
                            video.user.is_followed = true;
                        }  
                    }) 
                    videos.forEach((video) => { 
                        if(videoMeLike.includes(video._id.toString())){
                            video.is_liked = true;
                        }   
                    })
                    res.json(videos);
                })
                .catch(next);
        }
        else{

            Videos.find().populate('user').sort({createdAt: 'desc'}).exec()
                .then(videos => {
                    res.json(videos)
                })
                .catch(err => {
                console.log('error: ', err);
                });
        } 
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
        Users.findOneAndUpdate({_id: req.body.userId}, {$push: { videos: newVideo._id }}, { new: true } )
            .then((user) =>{
                res.json(user);
            })
            .catch(next);
        
      

       
    }
    

    
    // [Auth]
    //[POST] /videos/:id/like
    likeVideo(req, res, next) {
        // res.json(req.params.id);
        const idVideoLike = req.params.id;
        const idMe = res.locals.idUser;
        let userMeFollowing  = [];
        // console.log('idMe: ', idMe);
        Users.findById( {_id: idMe} )
            .then((me) => {
                // console.log('me nè: ',me);
                if (!me) {
                    res.status(404).json({ message: 'User not found' });
                }
                userMeFollowing = me.following;
                if (me.likedVideos.includes(idVideoLike)) {
                    res.status(400).json({ message: 'you haven not liked this video before' });
                } 
                me.likedVideos.push(idVideoLike); 
                // console.log('Mình nè: ',me);
                return me.save(); 
            })
            .then(() => {
                return Videos.findById({_id: idVideoLike}).populate('user').exec();
            })
            .then((videoLike) => {
                // console.log('otherPeople nè: ',otherPeople);

                if (!videoLike) {
                    res.status(404).json({ message: 'Video not found' });
                }
                 
                if (videoLike.likes.includes(idMe)) {
                    res.status(400).json({ message: 'you already liked this video' });
                }
                videoLike.likes.push(idMe);
                videoLike.likes_count++;  
                return videoLike.save(); 
            })
            .then((videos) => { 
                if (!videos) {
                    return res.status(404).json({ message: 'User not found' });
                }
                videos.is_liked = true; 
                // videos.user.likes_count++;
                // videos.user.save();
                if(userMeFollowing.includes(videos.user._id.toString())){
                    videos.user.is_followed = true;
                }
                 
                res.json(videos); 
            })
            .catch(next);

    }
    // [Auth]
    //[POST] /videos/:id/unlike
    unlikeVideo(req, res, next) {
        const idVideoUnLike = req.params.id;
        const idMe = res.locals.idUser;
        let userMeFollowing  = [];
        // console.log('idMe: ', idMe);
        Users.findById( {_id: idMe} )
            .then((me) => {
                // console.log('me nè: ',me);
                if (!me) {
                    res.status(404).json({ message: 'User not found' });
                }
                userMeFollowing = me.following;
                if (!me.likedVideos.includes(idVideoUnLike)) {
                    res.status(400).json({ message: 'you haven not liked this video before' });
                } 
                me.likedVideos.pull(idVideoUnLike); 
                // console.log('Mình nè: ',me);
                return me.save(); 
            })
            .then(() => {
                return Videos.findById({_id: idVideoUnLike}).populate('user').exec();
            })
            .then((videoUnLike) => {
                // console.log('otherPeople nè: ',otherPeople);

                if (!videoUnLike) {
                    res.status(404).json({ message: 'Video not found' });
                }
                 
                if (!videoUnLike.likes.includes(idMe)) {
                    res.status(400).json({ message: 'you already unliked this video' });
                }
                videoUnLike.likes.pull(idMe);
                videoUnLike.likes_count--;  
                return videoUnLike.save(); 
            })
            .then((video) => { 
                if (!video) {
                    return res.status(404).json({ message: 'User not found' });
                }
                video.is_liked = false; 
                // video.user.likes_count--;
                // video.user.save();
                if(userMeFollowing.includes(video.user._id.toString())){
                    video.user.is_followed = true;
                }
                res.json(video); 
            })
            .catch(next);
    }

    // [Auth]
    //[GET] /videos/:id/comments
    getCommentsListVideo(req, res, next) {
        res.json(req.params);
    }

    // [Auth]
    //[POST] /videos/:id/comments
    createCommentVideo(req, res, next) {
        res.json(req.params);
    }




}

module.exports = new VideoController();
