const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const OrderSchema = new Schema(
    { 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //ai đã mua đơn hàng này
        products: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},//Có những sản phẩm nào 
        fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //mua từ ai 
        total: { type: Number, default: 0},//tổng tiền cho đơn hàng đó 
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

module.exports = mongoose.model('Order', OrderSchema);
