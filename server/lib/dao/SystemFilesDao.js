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

		const sql = "SELECT id, type,  name, content from system_file where id in (select file_id from system_file where system_id = (select id from system where name ='"+req.payload.system+"'))";	;
	
		connect.query(sql,  function(err,rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},
	getFilesBySysId: function(req, res) {

		const sql = "select * from system_file where ? ";
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
					content: req.payload.content,
					system_id: req.payload.system_id
					};

		const sql = "insert into system_file SET ?";
		connect.query(sql,post, function(err, rows) {
	 		if (err) { throw err;}	
	 		res("add file success");  		
		});

		if (post.type == "propertites") {
			const config_sql = "INSERT into system_file (system_id,file_id) VALUES("+req.payload.system_id+",(select id from system_file where name = '"+post.name+"'));";
			connect.query(config_sql, function(err, rows) {
	 		if (err) { throw err;}
	  		res("add file config success");
			});
		}	
		
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
	},

	delete : function(req, res) {
		const sql = "delete from system_file where ?";
		const post = {id: req.params.id};

		connect.query(sql,post, function(err, rows) {
	 		if (err) { throw err;}
	  		res("delete success");
		});
	},

	deleteFile : function(req, res) {
		const sql = "delete cfg, f from system_cfg cfg ,system_file f where cfg.file_id=f.id and f.id="+req.params.id;
		// const post = {id: req.params.id}; ,post

		connect.query(sql, function(err, rows) {
	 		if (err) { throw err;}
	  		res("delete properties success");
		});
	},

	deleteBySysId : function(req, res) {
		const sql = "delete from system_file where ?";
		const post = {system_id: req.params.id};

		connect.query(sql,post, function(err, rows) {
	 		if (err) { throw err;}
	  		res("delete file success");
		});
	},

}