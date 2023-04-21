const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const VideoSchema = new Schema( 
    {
        title: { type: String },
        file_url: { type: String  },
        thumb_url: { type: String },// URL to the video thumbnail
        description: { type: String },
        music: { type: String },
        comments_count: { type: Number, default: 0 },
        likes_count: { type: Number, default: 0 },
        shares_count: { type: Number, default: 0 },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        views: { type: Number, default: 0 },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],// Array of user IDs for users who liked this video
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
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

module.exports = mongoose.model('Video', VideoSchema);
