const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const NotificationSchema = new Schema(
    { 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},// ID of the user who received the notification
        type: { type: String  },// Type of the notification, e.g. "like", "comment", "follow", "likecomment"
        fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },// ID of the user who triggered the notification
        video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video'},
        comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment'},
        follow: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        read: { type: Boolean, default: false },// Indicates whether the notification has been read
        createdAt: { type: Date, default: Date.now },
         
    },
    {
        timestamps: true,
    },
);

//Add plugins
// mongoose.plugin(slug);
// VideoSchema.plugin(mongooseDelete, {
//     deletedAt: true,
//     overrideMethods: 'all',
// });

module.exports = mongoose.model('Notification', NotificationSchema);
