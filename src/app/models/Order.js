const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const OrderSchema = new Schema(
    {  
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        products: [
            {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, 
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true }
            }
        ],
        totalPrice: { type: Number, required: true },
        status: { type: String, default: 'pending' },
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

module.exports = mongoose.model('Order', OrderSchema);
