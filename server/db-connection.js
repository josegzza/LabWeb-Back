var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'me',
    password : 'secret',
    database = 'my_db'
});

connection.connect(error => {
    if(error) throw error;
    console.log('Database server running!');
});

connection.end();