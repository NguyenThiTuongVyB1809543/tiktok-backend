const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const VideoSchema = new Schema(
    // { 
    //     file_url: String,
    //     thumb_url: String,
    //     description: String,
    //     is_liked: String,
    //     comments_count: String,
    //     likes_count: String,
    //     shares_count: String,                                                                                       


    // },
    
    {
        title: { type: String, required: true },
        description: { type: String },
        videoUrl: { type: String, required: true },
        thumbnailUrl: { type: String },// URL to the video thumbnail
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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

module.exports = mongoose.model('video', VideoSchema);
