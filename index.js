//require('dotenv').config()

const express = require('express');
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
//const connection = require('./db-connection');
app.use(express.json());


/*Controllers
const homePageController = require('./server/controllers/homePage')
const createEquipoController = require('./server/controllers/createEquipo')
const createPrestamoController = require('./server/controllers/createPrestamo')
const createResponsivaController = require('./server/controllers/createResponsiva')
const createUserController = require('./server/controllers/createUser')
const deleteEquipoController = require('./server/controllers/deleteEquipo')
const deletePrestamoController = require('./server/controllers/deletePrestamo')
const deleteResponsivaController = require('./server/controllers/deleteResponsiva')
*/

// Port 8080 for Google App Engine
const port = process.env.PORT || 3050;
app.listen(port, () => {
  console.log(`TCA DB API listening on port ${port}`);
});

const connection = mysql.createConnection({
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'b6bb37f77836e0',
  database: 'heroku_c7c3eb92efb0828',
  password: 'a52a42ae',
});

// database: process.env.DB_DATABASE,
// b6bb37f77836e0:a52a42ae@us-cdbr-east-04.cleardb.com/heroku_c7c3eb92efb0828


connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as thread id: ' + connection.threadId);
});


//Routes
//app.get('/',homePageController);

app.get('/', function (req, res) {
  //res.sendFile(path.resolve(__dirname, '../client/login.html'));
  res.send("Welcome to my api!")
});

app.get('/departamento', function (req,res){
  const sql = 'SELECT * FROM departamento';
});




//app.set('port', process.env.PORT || 8080);
//app.listen(3000);

//app.get('/', function (req, res) {
  // res.sendFile(path.resolve(__dirname, '../client/login.html'));
//  res.send("Welcome to my api!")
//})

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