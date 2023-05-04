const Users = require('../models/User');
const Notifications = require('../models/Notification');
const { mongooseToObject } = require('../../util/monggoose');
const { response } = require('express');

class NotificationController {
     
    getListNotification(req, res, next) { 
        const idMe = res.locals.idUser;
        Users.findById(idMe)
            .then(me => { 
                if (!me) {
                    res.status(404).json({ message: 'User not found' });
                }
                const notificationIds = me.notifications;
                return Notifications.find({ _id: { $in: notificationIds } }).populate('fromUser').exec();
            }) 
            .then(notifications => {
                res.json(notifications);
            })
            .catch(next);
    }
      
       

}

module.exports = new NotificationController();
