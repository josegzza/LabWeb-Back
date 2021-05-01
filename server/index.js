const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true,
}));

require('./config/config');
//configuracion global de rutas
// app.use(require('./routes/main'));
const path = require('path')

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

// app.get('/register', function (req, res) {
// res.sendFile(path.resolve(__dirname, '../client/register.html'));
// })


// connection.connect(error => {
//   if(error) throw error;
//   console.log('Database server running!');
// });

// connection.end();

app.listen(process.env.PORT, ()=> {
  console.log("Listening in port 3000.");
});
