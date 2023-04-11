const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const VideoSchema = new Schema(
    {
        // file_url: { type: String },
        // thumb_url: { type: String },
        // description: { type: String },
        // is_liked: { type: String },
        // comments_count: { type: String },
        // likes_count: { type: String },
        // shares_count: { type: String },
        // slug: { type: String, slug: 'name', unique: true },
        // createdAt: { type: Date, default: Date.now }, //lưu thời gian bản ghi được tạo
        // updatedAt: { type: Date, default: Date.now }, //lưu thời gian bản ghi được cập nhật

        file_url: String,
        thumb_url: String,
        description: String,
        is_liked: String,
        comments_count: String,
        likes_count: String,
        shares_count: String,                                                                                       


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
