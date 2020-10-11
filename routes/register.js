var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    post: 3307,
    user: 'root',
    password: '',
    database: 'mydb'
});