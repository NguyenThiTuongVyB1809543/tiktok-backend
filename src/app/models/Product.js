const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const ProductSchema = new Schema( 
    { 
        product_img_url: { type: String  }, 
        product_name: { type: String }, 
        description: { type: String }, 
        price: { type: Number, default: 0 },
        buy_count: { type: Number, default:0},
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //sản phẩm này của ai
        buys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],// có những ai đã mua những sản phẩm này
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

module.exports = mongoose.model('Product', ProductSchema);
