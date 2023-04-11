const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const UserSchema = new Schema(
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

        email: String,
        password: String,
        type: String,
        nickname: String,
        avatar: String,
        fullname: String,
        first_name: String,
        last_name: String,
        is_followed: String,
        followings_count: String,                                                                                       
        followers_count: String,                                                                                       
        likes_count: String,                                                                                       
        bio: String,                                                                                


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

module.exports = mongoose.model('user', UserSchema);
