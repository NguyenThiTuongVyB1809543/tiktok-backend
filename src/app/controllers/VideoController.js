const Videos = require('./../models/Video');
const { mongooseToObject } = require('../../util/monggoose');
const { response } = require('express');

class VideoController {
    //[GET] /videos/show
    showVideo(req, res, next) {
        Videos.find({})
            .then(video => res.json(video))
            .catch(next);
    }
    //[GET] /videos?type=for-you&page=1 
    getVideoList(req, res, next) {
        if(['for-you'].includes(req.query.type )){
            if(['1'].includes(req.query.page )){  
                return next();
            } 
        }
        res.status(403).json({
            message: 'Access denied, khum cho vao'
        })
    }
    chongTreo(req, res, next) { //1 middleware nên có next() hoặc phải có res.send() nếu không sẽ bị treo 
        Videos.find({})
            .then(video => res.json(video))
            .catch(next);
    } 
    

    //[GET] /videos/:id
    getVideo(req, res, next) {
        Videos.findById({ _id:req.params.id })
            .then(video => res.json(video))
            .catch(next);
    }

}

module.exports = new VideoController();
