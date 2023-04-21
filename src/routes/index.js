const videoRouter = require('./videos');
const userRouter = require('./users');
const nothingRouter = require('./nothing');
// const commentRouter = require('./comments');
const authRouter = require('./auth');
// const meRouter = require('./me');
function route(app) { 
    app.use('/videos', videoRouter);  
    app.use('/users', userRouter);  
    // app.use('/comments', commentRouter);
    app.use('/auth', authRouter);  
    // app.use('/me', meRouter);
    app.use('/', nothingRouter);
}

module.exports = route;
