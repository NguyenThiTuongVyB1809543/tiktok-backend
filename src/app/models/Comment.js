const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const CommentSchema = new Schema(
    { 
        comment: { type: String },
        is_liked: { type: Boolean, default: false },
        likes_count: { type: Number, default: 0 },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },// ID of the user who made the comment
        video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },// ID of the video the comment was made on
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],// Array of user IDs for users who liked this comment
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

module.exports = mongoose.model('Comment', CommentSchema);
