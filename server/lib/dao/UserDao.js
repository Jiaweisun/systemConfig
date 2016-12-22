const connect = require('../config/db.js');
const events = require('events')
// const UserModel = require('../models/user.js')

var proxy = new events.EventEmitter();
var status = "ready"


module.exports = {	

	add : function(req,res) {
		const sql = "insert into system_user SET ?";
		const post = {name: req.payload.name, 
					  login_name: req.payload.login_name
						 // password: req.body.password,
						 // mobile: req.body.mobile,
						 // district_id: req.body.district_id,
						 // comment:req.body.comment
					};
		connect.query(sql,post, function(err, rows) {
	 		if (err) { throw err;}
	  		res("add success");
		});
	},
	
	delete : function(req, res) {
		const sql = "delete from system_user where ?";
		const post = {id: req.params.id};

		connect.query(sql,post, function(err, rows) {
	 		if (err) { throw err;}
	  		res("delete success");
		});
	},

	update: function(req, res) {

		const post = {name: req.payload.name,
					login_name: req.payload.login_name,
					id: req.params.id}

		const sql = "update  system_user SET name= '"+post.name+"', login_name = '"+post.login_name+"' where id ="+post.id

		connect.query(sql,function(err,rows){
			if (err) { throw err;}
	  		res(rows);
		});
	},

	get: function(req, res) {

		const sql = "select * from system_user where ?";
		const post = {id: req.params.id};

		connect.query(sql, post, function(err,rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},

	list: function(cb) {
		proxy.once("had list",cb);
		if (status === "ready") {
			status = "pending";
			const sql = "select * from system_user";
			connect.query(sql, function(err,rows) {				
	 			if (err) { throw err;}
	 			proxy.emit("list",rows);
	 			status = "ready";
	  			cb(rows);
		});
		}		
	},
	login : function(req,res) {
		const sql = "select * from system_user where ?";
		const post = {
			login_name: req.payload.login_name,
			password: req.payload.password,
		};
		connect.query(sql,post, function(err, rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},
}