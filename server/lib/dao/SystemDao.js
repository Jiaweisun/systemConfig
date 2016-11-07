const connect = require('../../resources/db.js');

let fileApi = require('../dao/SystemFilesDao.js');
let fileConfigApi = require('../dao/SystemConfigDao.js');

module.exports = {

	get: function(req, res) {

		const sql = "select * from system where ?";
		const post = {id: req.params.id};

		connect.query(sql, post, function(err,rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},


	getByName: function(req, res) {

		const sql = "select id from system where ?";		
		const post = {name: req.payload.system};

		connect.query(sql, post, function(err,rows) {			
	 		if (err) { throw err;}
	  		res(rows[0].id);
		});
	},

	list: function(cb) {
		const sql = "select * from system";

		connect.query(sql, function(err,rows) {
	 		if (err) { throw err;}
	  		cb(rows);
		});
	},

	add : function(req,res) {
		const sql = "insert into system SET ?";
		const post = {
					title: req.payload.title, 
					name: req.payload.name
					};
		connect.query(sql,post, function(err, rows) {
	 		if (err) { throw err;}
	  		res("add success");
		});
	},

	delete : function(req, res) {

		fileConfigApi.deleteBySysId(req,reply=>{			
			fileApi.deleteBySysId(req, rep=>{				
					const sql = "delete from system where ?";
					const post = {
						id: req.params.id
					};
					connect.query(sql,post, function(err, rows) {
						if (err) { throw err;}
						res('delete success');
					})
			})
		});
	
	}
}