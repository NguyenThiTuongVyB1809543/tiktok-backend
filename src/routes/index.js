const videoRouter = require('./videos'); 
const userRouter = require('./users'); 
// const commentRouter = require('./comments');
const authRouter = require('./auth');
const meRouter = require('./me');
function route(app) { 
    app.use('/videos', videoRouter);    
    app.use('/users', userRouter);  
    // app.use('/comments', commentRouter);
    app.use('/auth', authRouter);  
    // app.use('/me', meRouter); 
}

module.exports = route;
