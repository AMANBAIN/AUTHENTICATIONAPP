var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
 
mongoose.connect("mongodb://localhost:27017/usercollection", {useNewUrlParser: true, useUnifiedTopology: true});
var teacherModel = require('../models/config');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

var router = express.Router();	
router.use(session({
	secret: 'key',
	resave: true,
	saveUninitialized: true
}));
/* GET home page. */
router.get('/loginpage', function(req, res, next) {
 req.session.destroy();//destroy session
  res.render('loginpage', { title: 'Login Page' });
});

router.post('/', function(req, res, next) {
 teacherModel.findOne({email:req.body.email}).exec().then(result=>{
 	if(bcryptjs.compareSync(req.body.password,result.password)){
		req.session.cust_log = "true"; 
			req.session.email = result.email; 
		res.redirect('contactlist.html');
		}
	else{
	    res.status(201).json({"error":"Wrong Password"}); 
	}	
 }).catch(err=>{
 	res.status(500).json({"error":"Wrong Password"});
 });

});

router.get('/signup', function(req, res, next) {
 res.render('signup', { title: 'Signup' });
});

router.post('/signup', function(req, res, next) {
	//console.log(req.body.password);
	bcryptjs.genSalt(saltRounds, function(err, salt) {
	bcryptjs.hash(req.body.password, salt, function(err, hash) {
	const teacher = new teacherModel({
	email: req.body.email,
	password:hash
	});
	teacher
	.save()
	.then(result=>{
			res.redirect('/loginpage');
	//res.render('index', { title: 'Express' });
	})
	.catch(err=>{
	res.send("Error ");
	//res.status(500).json({error:err});
	});

	});
	});
});


router.get('/contactlist', function(req, res, next) {
 res.render('login', { title: 'Please Login To Continue' });
});

router.get('/', function(req, res, next) {
 res.render('home', { title: 'Home' });
});

router.get('/services', function(req, res, next) {
 res.render('services', { title: 'Services' });
});
router.get('/about', function(req, res, next) {
 res.render('about', { title: 'About Me' });
});
router.get('/projects', function(req, res, next) {
 res.render('projects', { title: 'My projects' });
});
router.get('/contact', function(req, res, next) {
 res.render('contact', { title: 'Contact Me' });
});



module.exports = router;
