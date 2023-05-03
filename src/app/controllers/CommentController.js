const Videos = require('../models/Video');
const Users = require('../models/User');
const Comments = require('../models/Comment');
const { mongooseToObject } = require('../../util/monggoose');
const { response } = require('express');
const multer = require('multer');
const path = require('path');
const authMethod = require('./auth.methods');
const jwtVariable = require('../../variables/jwt');
const Video = require('../models/Video');

class CommentController {
    // [Auth] [POST] /comments/:id/like
    likeComment(req, res, next) {
        const idComment = req.params.id;
        const idMe = res.locals.idUser;
        // console.log('idMe: ', idMe );
        Users.findById( {_id: idMe} )
            .then((me) => {
                // console.log('me nè: ',me);
                if (!me) {
                    res.status(404).json({ message: 'User not found' });
                }
                 
                if (me.likedComments.includes(idComment)) {
                    res.status(400).json({ message: 'Bạn đã từng like commment này rồi và giờ bạn không đưuọc like nữa' });
                } 
                me.likedComments.push(idComment); 
                // console.log('Mình nè: ',me);
                return me.save(); 
            })
            .then(() => {
                return Comments.findById({ _id: idComment}).populate('user').exec();
            })
            .then((commentLike) => {
                if (!commentLike) {
                    res.status(404).json({ message: 'Comment not found' });
                }
                if (commentLike.likes.includes(idMe)) {
                    res.status(400).json({ message: 'you already liked this comment' });
                }
                commentLike.likes.push(idMe);
                commentLike.likes_count++;  
                return commentLike.save();  
            })
            .then((comment) => { 
                if (!comment) {
                    return res.status(404).json({ message: 'Comment not found' });
                }
                comment.is_liked = true;  
                res.json(comment); 
            })
            .catch(next);   
    }
    // [Auth] [POST]/comments/:id/unlike
    unlikeComment(req, res, next) {
        const idComment = req.params.id;
        const idMe = res.locals.idUser;
        // console.log('idMe: ', idMe );
        Users.findById( {_id: idMe} )
            .then((me) => {
                // console.log('me nè: ',me);
                if (!me) {
                    res.status(404).json({ message: 'User not found' });
                }
                
                if (!me.likedComments.includes(idComment)) {
                    res.status(400).json({ message: 'Bạn chưa từng like video này nên không thể bỏ like được' });
                } 
                me.likedComments.pull(idComment); 
                // console.log('Mình nè: ',me);
                return me.save(); 
            })
            .then(() => {
                return Comments.findById({ _id: idComment}).populate('user').exec();
            })
            .then((commentUnLike) => {
                // console.log('otherPeople nè: ',otherPeople);

                if (!commentUnLike) {
                    res.status(404).json({ message: 'Comment not found' });
                }
                
                if (!commentUnLike.likes.includes(idMe)) {
                    res.status(400).json({ message: 'you already unliked this comment' });
                }
                commentUnLike.likes.pull(idMe);
                commentUnLike.likes_count--;  
                return commentUnLike.save(); 
            })
            .then((comment) => { 
                if (!comment) {
                    return res.status(404).json({ message: 'Comment not found' });
                }
                comment.is_liked = false;    
                res.json(comment); 
            })
            .catch(next); 
    }

    // [Auth] [DELETE]/comments/:id 
    deleteComment(req, res, next){
        const idComment = req.params.id;
        // console.log(idComment);
        const idMe = res.locals.idUser; 
        Comments.findByIdAndDelete(idComment) 
          .then(() => {
            res.status(204).send('ok');
          })
          .catch(next);
    }

}

module.exports = new CommentController();
