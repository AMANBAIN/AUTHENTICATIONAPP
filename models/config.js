const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conn =mongoose.Collection;
var usersSchema =new mongoose.Schema({
	email: String,
	password:String
});

var usersModel = mongoose.model('users', usersSchema);
module.exports=usersModel;
