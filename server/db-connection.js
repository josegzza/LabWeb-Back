const mysql = require('mysql');
require('dotenv').config()
// Database Connection for Production

// Database Connection for Development

const connection = mysql.createConnection({
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'b6bb37f77836e0',
  database: 'heroku_c7c3eb92efb0828',
  //database: process.env.DB_DATABASE,
  password: 'a52a42ae',
});

// b6bb37f77836e0:a52a42ae@us-cdbr-east-04.cleardb.com/heroku_c7c3eb92efb0828


  connection.connect(function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connected as thread id: ' + connection.threadId);
  });

  module.exports = connection;