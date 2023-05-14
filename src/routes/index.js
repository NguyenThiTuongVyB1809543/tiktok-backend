const videoRouter = require('./videos'); 
const userRouter = require('./users'); 
const commentRouter = require('./comments');
const authRouter = require('./auth');
const meRouter = require('./me');
const notificationRouter = require('./notifications');
const productRouter = require('./products');
const cartRouter = require('./carts');
const orderRouter = require('./orders');
function route(app) { 
    app.use('/videos', videoRouter);    
    app.use('/users', userRouter);  
    app.use('/comments', commentRouter);
    app.use('/products', productRouter);
    app.use('/carts', cartRouter);
    app.use('/orders', orderRouter);
    app.use('/notifications', notificationRouter);
    app.use('/auth', authRouter);  
    app.use('/me', meRouter); 
}

module.exports = route;
