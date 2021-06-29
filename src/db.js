require('dotenv').config({ path: '../.env' });
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: 'qpuc'
});
module.exports = connection;