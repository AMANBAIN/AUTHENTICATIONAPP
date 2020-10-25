
//define the variables for the dependencies we need

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();

//declaring variable for mongoose
var mongoose = require('mongoose');


/* Mongoose conncection with app */
//usercollection is our database name
mongoose.connect("mongodb://localhost:27017/usercollection", {useNewUrlParser: true, useUnifiedTopology: true});

//loading the configuration file for database
var teacherModel = require('./models/config');

//using the node modules
app.use(bodyParser.json());
app.use(express.static(__dirname+'/client'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));


//routing the routs for our web application
var router = express.Router();

router.route('/contacts')
.get(require('./controllers/contactsGet'))
.post(require('./controllers/contactsPost'));

router.route('/contact/:id')
.get(require('./controllers/contactGet'))
.delete(require('./controllers/contactDelete'))
.put(require('./controllers/contactPut'));

app.use(router);

//setting ejs as a template engine 
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

//routing the ejs templates (html pages of the website)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

//port configuration
var port = process.env.PORT || 80;
app.listen(port);
console.log('Express started at Port 80');
