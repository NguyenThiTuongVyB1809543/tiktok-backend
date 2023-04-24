const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./routes'); //gõ thư mục thì nó sẽ tự động nạp file index
const db = require('./config/db');
const app = express();
const port = 8000;
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser= require('body-parser');
const multer = require('multer');
// require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}))
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



// app.get('/home', function(req, res) {
//     res.json({ message: 'WELCOME' });   
// });
// app.get('/', (req, res) => {
//         res.render('home');//render home thì nó lấy home.handlebars nó đưa vào {{{body}}} ở trang D:\nodejs\blog\src\resources\views\layouts\main.handlebars
// })
 
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
   
//   var upload = multer({ storage: storage })

//   app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//     const file = req.file
//     if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//       return next(error)
//     }
//     res.send(file)
//   })



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
