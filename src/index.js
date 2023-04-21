const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./routes'); //gõ thư mục thì nó sẽ tự động nạp file index
const db = require('./config/db');
const app = express();
const port = 8000;
const methodOverride = require('method-override');
const cors = require('cors')
// require('dotenv').config()


app.use(cors())  
app.use(methodOverride('_method'));
//Connect to DB
db.connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//HTTP logger
app.use(morgan('combined'));
//Template engine
// app.engine('handlebars' handlebars()) ^ typeerror handlebars is not a function
app.engine(
    'hbs',
    handlebars.engine({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Home, Search, contact.... là những trang không nằm ở những tài nguyên cụ thể -> cho vào siteController

//Route init
route(app);


app.get('/middleware', 
    function(req, res, next) {
        if(['vethuong', 'vevip'].includes(req.query.ve)){
            req.face = 'Gach gach gach!!!';
            return next();
        }
        res.status(403).json({
            message: 'Access denied, khum cho vao'
        })
    }, 
    function(req, res, next) { //1 middleware nên có next() hoặc phải có res.send() nếu không sẽ bị treo
        res.json({
            message: 'Successfully',
            face: req.face
        });
        next();
    }
);



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
