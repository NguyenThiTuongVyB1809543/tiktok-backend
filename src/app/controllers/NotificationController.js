const Users = require('../models/User');
const Notifications = require('../models/Notification');
const { mongooseToObject } = require('../../util/monggoose');
const { response } = require('express');

class NotificationController {
     
    getListNotification(req, res, next) { 
        const idMe = res.locals.idUser;
        Notifications.find({ user: idMe }).populate('fromUser').populate('video').sort({createdAt: 'desc'}).exec()
            .then((notifications) => { 
                // console.log('res.json(notifications) : ',notifications.video._id )
                res.json(notifications);
            })
            .catch(next) 
             
    }
      
       

}

module.exports = new NotificationController();
