const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const CartSchema = new Schema( 
    {  
        products: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, //cart này có sản phẩm nào
        quantity: { type: Number, default: 1 },  
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //cart này của ai
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

module.exports = mongoose.model('Cart', CartSchema);
