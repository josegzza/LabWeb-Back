require('dotenv').config()

const express = require('express');
const app = new express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
const connection = require('./db-connection');

app.use(express.json());

//Controllers
const homePageController = require('./controllers/homePage')
const createEquipoController = require('./controllers/createEquipo')
const createPrestamoController = require('./controllers/createPrestamo')
const createResponsivaController = require('./controllers/createResponsiva')
const createUserController = require('./controllers/createUser')
const deleteEquipoController = require('./controllers/deleteEquipo')
const deletePrestamoController = require('./controllers/deletePrestamo')
const deleteResponsivaController = require('./controllers/deleteResponsiva')

// Port 8080 for Google App Engine
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`TCA DB API listening on port ${port}`);
});

//Routes
app.get('/',homePageController);
app.get("/:breed",async(req,res) => {
  const query = "SELECT * FROM breeds WHERE name = ?";
  connection.query(query, [req.params.breed], (error,results) => {
    if(!results[0]){
      res.json({status : "Not found!"});
    } else {
      res.json(results[0]);
    }
  });
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