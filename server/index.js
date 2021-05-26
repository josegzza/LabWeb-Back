require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./db-connection');



//configuracion global de rutas
// app.use(require('./routes/main'));

// //mysql connection
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host : 'localhost',
//     user : 'me',
//     password : 'secret',
//     database : 'mydb'
// });


//Routes
app.get('/', function (req, res) {
  // res.sendFile(path.resolve(__dirname, '../client/login.html'));
  res.send("Welcome to my api!")
})

// app.route('/db')
//   .get(function(req, res, next) {
//     connection.query(
//       "SELECT * FROM `books` WHERE userId = ? LIMIT 3", req.params.userId,
//       function(error, results, fields) {
//         if (error) throw error;
//         res.json(results);
//       }
//     );
//   });


// Port 8080 for Google App Engine
app.set('port', process.env.PORT || 3000);
app.listen(3000);
