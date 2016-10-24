const connect = require('../../resources/db.js');

module.exports = {

	get: function(req, res) {

		const sql = "select * from system_file where ?";
		const post = {id: req.params.id};

		connect.query(sql, post, function(err,rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},

	getByName: function(req, res) {

		const sql = "select id from system_file where ?";		
		
		const post = {name: req.payload.filename};
		connect.query(sql, post, function(err,rows) {
	 		if (err) { throw err;}
	  		res(rows[0].id);
		});
	},

	getFilesBySysName: function(req, res) {

		const sql = "SELECT id, type,  name, content from system_file where id in (select file_id from system_cfg where system_id = (select id from system where name ='"+req.payload.system+"'))";	;
	
		connect.query(sql,  function(err,rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},
	getFilesBySysId: function(req, res) {

		const sql = "select * from system_file where id in( select file_id from system_cfg where ? ) ";	;
		const post = {system_id: req.params.system_id};

		connect.query(sql,post,  function(err,rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},

	list: function(cb) {
		const sql = "select * from system_file";

		connect.query(sql, function(err,rows) {
	 		if (err) { throw err;}
	  		cb(rows);
		});
	},

	add : function(req,res) {
		const post = {					
					name: req.payload.name,
					type: req.payload.type,
					content: req.payload.content
					};
		const sql = "insert into system_file SET ?";
		const config_sql = "INSERT into system_cfg (system_id,file_id) VALUES("+req.payload.system_id+",(select id from system_file where name = '"+post.name+"'));";
		

		connect.query(sql,post, function(err, rows) {
	 		if (err) { throw err;}	  		
		});
		connect.query(config_sql, function(err, rows) {
	 		if (err) { throw err;}
	  		res("add file config success");
		});
	},

	delete : function(req, res) {
		const sql = "delete from system_file where ?";
		const post = {id: req.params.id};

		connect.query(sql,post, function(err, rows) {
	 		if (err) { throw err;}
	  		res("delete success");
		});
	},

	update: function(req, res) {

		const post = {					
					content: req.payload.content,
					id: req.payload.id
				}

		const sql = "update  system_file SET ?  where id ="+post.id
		connect.query(sql,post, function(err,rows){
			if (err) { throw err;}
	  		res(rows);
		});
	}
}