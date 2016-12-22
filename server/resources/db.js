"use strict";
var mysql = require('mysql');

module.exports = mysql.createConnection({
	
  host : 'localhost',
  port : '3306',
  user : 'root',
  password : '',
  database : 'configcenter'

  // host : '192.168.1.231',
  // port : '3306',
  // user : 'root',
  // password : 'kashuotest123456',
  // database : 'centerConfig'

  // host : '58.210.177.87',
  // port : '33639',
  // user : 'config_user',
  // password : 'kashuo_config_password',
  // database : 'configcenter_dev'
});