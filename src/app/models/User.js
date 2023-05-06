const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const UserSchema = new Schema( 
    { 
        email: { type: String },
        nickname: { type: String },
        password: { type: String },
        displayName: { type: String },
        fullname: { type: String },
        first_name: { type: String },
        last_name: { type: String },
        followings_count: { type: Number, default: 0 },
        followers_count: { type: Number, default: 0 },
        likes_count: { type: Number, default: 0 },
        products_count: { type: Number, default: 0 },
        is_followed: { type: Boolean, default: false},
        bio: { type: String },
        tick: { type: Boolean },
        avatar: { type: String, default: "/src/assets/images/Avatar.jpeg" },// URL to user's profile picture
        coverImage: { type: String },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],// Array of user IDs for users who follow this user
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],// Array of user IDs for users this user follows
        videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
        buyProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        likedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
        notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
        createdAt: { type: Date, default: Date.now }
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

module.exports = mongoose.model('User', UserSchema);
