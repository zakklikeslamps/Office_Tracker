
const mysql = require('mysql');
require('dotenv').config()


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PW,
    database: 'officeDB',
});

module.exports = connection;