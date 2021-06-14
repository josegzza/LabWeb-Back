require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./server/db-connection');
const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize("mysql::memory:");
const cors = require('cors');

//configuracion global de rutas
// app.use(require('./routes/main'));

//Routes




app.get('/', function (req, res) {
  // res.sendFile(path.resolve(__dirname, '../client/login.html'));
  res.send("Welcome to my api!")
})



app.get('/departamento', function (req,res){
  const sql = 'SELECT * FROM departamento';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/departamento/:id', function (req,res){
  const sql = `SELECT dpto_nombre FROM departamento WHERE dpto_id = ${id}`;
  connection.query(sql, (error
    , results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});


app.get('/responsiba/:id', function (req,res){
  const sql = 'SELECT * FROM responsiva WHERE colab_id IS EQUAL';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/departamento', function (req,res){
  const sql = 'SELECT * FROM departamento';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});


// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:8000', 'https://tcamx-inventario.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// Port 8080 for Google App Engine
app.set('port', process.env.PORT || 8000);
app.listen(8000);

//Queries to server
setInterval(function () {
  connection.query('SELECT 1');
}, 5000);


/* 
const User = sequelize.define('colaborador', {
  colab_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  colab_nombre : DataTypes.TEXT,
  colab_apellido: DataTypes.TEXT,
  colab_pseudo: DataTypes.TEXT,
  sede_id: DataTypes.INTEGER,
  dpto_id: DataTypes.INTEGER,
  password: {
      type: DataTypes.TEXT,
      allowNull: false,
      required : true
  }
})
app.put('/user', async function (req,res){
  const diego = await User.create({colab_nombre : "Diego", colab_apellido : "Montano", colab_pseudo : "DM", sede_id : 15, dpto_id : 1, password : "hola12345"});
  console.log("Diego auto-gen ID =", diego.colab_id);
});
*/