"use strict";
var mysql = require('mysql');

module.exports = mysql.createConnection({
	
  host : '192.168.1.231',
  port : '3306',
  user : 'root',
  password : 'kashuotest123456',
  database : 'centerConfig'
});