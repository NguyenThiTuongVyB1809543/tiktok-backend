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

}

module.exports = new VideoController();
