const connect = require('../../resources/db.js');

module.exports = {

	get: function(req, res) {

		const sql = "select * from system_cfg where ?";
		const post = {id: req.params.id};

		connect.query(sql, post, function(err,rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},

	getFileBySysId: function(req, res) {

		const sql = "select distinct(file_id) from system_cfg where ?";
		const post = {system_id: req.params.system_id};

		connect.query(sql, post, function(err,rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},

	getBySfid: function(req, res) {

		const sql = "select * from system_cfg where system_id = "+ req.params.system_id+" and file_id = "+req.params.file_id;
		connect.query(sql, function(err,rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},

	getBySfName: function(req, file_id, res) {

		if (req.payload.profile=="dev") {
			profile =  "dev_value";
		}
		if (req.payload.profile=="qa") {
			profile =  "qa_value";
		}
		if (req.payload.profile=="prod") {
			profile =  "prod_value";				
		}

		const sql = "select key_name ,  "+profile+" from system_cfg where file_id = "+ file_id+" and system_id = (select id from system where name = '"+req.payload.system+"' ) ";
		connect.query(sql, function(err,rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},

	getBySysId: function(req, res) {

		const sql = "select * from system_cfg where ?";
		const post = {system_id: req.params.system_id};

		connect.query(sql, post, function(err,rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},

	list: function(cb) {
		const sql = "select * from system_cfg";

		connect.query(sql, function(err,rows) {
	 		if (err) { throw err;}
	  		cb(rows);
		});
	},

	add : function(req,res) {
		const sql = "insert into system_cfg SET ?";
		const post = {
					system_id: req.payload.system_id, 
					name: req.payload.name,
					key_name: req.payload.key_name,
					file_id: req.payload.file_id,
					dev_value: req.payload.dev_value,
					qa_value: req.payload.qa_value,
					prod_value: req.payload.prod_value,
					privatepro: req.payload.privatepro

					};
		connect.query(sql,post, function(err, rows) {
	 		if (err) { throw err;}
	  		res("add success");
		});
	},

	update: function(req, res) {

		const post = {
					id: req.payload.id,
					system_id: req.payload.system_id, 
					name: req.payload.name,
					key_name: req.payload.key_name,
					file_id: req.payload.file_id,
					dev_value: req.payload.dev_value,
					qa_value: req.payload.qa_value,
					prod_value: req.payload.prod_value,
					privatepro: req.payload.privatepro
				}

		const sql = "update  system_cfg SET ?  where id ="+post.id
		connect.query(sql,post, function(err,rows){
			if (err) { throw err;}
	  		res(rows);
		});
	},

	delete : function(req, res) {
		const sql = "delete from system_cfg where ?";
		const post = {id: req.params.id};

		connect.query(sql,post, function(err, rows) {
	 		if (err) { throw err;}
	  		res("delete success");
		});
	},

	deleteBySysId : function(req, res) {
		const sql = "delete from system_cfg where ?";
		const post = {system_id: req.params.id};

		connect.query(sql,post, function(err, rows) {
	 		if (err) { throw err;}
	  		res(rows);
		});
	},
}