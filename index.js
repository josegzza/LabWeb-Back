require('dotenv').config()

const express = require('express');
const expressSession = require('express-session'); 
const app = express();
const bodyParser = require('body-parser');
const connection = require('./server/db-connection');
// const {Sequelize, DataTypes} = require('sequelize')
// const sequelize = new Sequelize("mysql::memory:");
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json())
app.use(expressSession({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//Routes
app.get('/', function (req, res) {
  // res.sendFile(path.resolve(__dirname, '../client/login.html'));
  res.send("Welcome to my api!")
})


// Check if user exists in DB
app.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		connection.query('SELECT * FROM colaborador WHERE colab_pseudo = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
        req.session.username = username;
        res.send('Usuario encontrado');
				//res.redirect('/user');
			} else {
				res.send('Usuario y/o contraseña incorrectas!');
			}			
			res.end();
		});
	} else {
		res.send('Porfavor ingresa usuario y contraseña!');
		res.end();
	}
});

//---------------------------Departamento------------------------------------
//Select all
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

//departamento by id
app.get('/departamento_id/:dept_id', function (req,res){
  let dept_id = req.params.dept_id;
  connection.query('SELECT * FROM departamento WHERE dpto_id = ?', dept_id, (error, result) =>{
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});


//---------------------------Responsiva------------------------------------
//responsiva por colab_id
app.get('/responsiva_colab/:colab_id', function (req,res){
  let colab_id = req.params.colab_id;
  //Safe way
  connection.query('SELECT * FROM responsiva WHERE colab_id = ?', colab_id, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

//responsiva por rps_id
app.get('/responsiva/:rps_id', function (req,res){
  let rps_id = req.params.rps_id;
  //Safe way
  connection.query('SELECT * FROM responsiva WHERE rps_id = ?', rps_id, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

//----------------------colaborador----------------------
//query chido
app.get('/colaborador/:colab_id', function (req,res){
  let colab_id = req.params.colab_id
  //Safe way
  connection.query('SELECT * FROM colaborador C LEFT JOIN responsiva R ON C.colab_id = R.colab_id LEFT JOIN departamento d on C.dpto_id = d.dpto_id LEFT JOIN prestamo p on R.rps_id = p.rps_id LEFT JOIN equipo e on p.eq_id = e.eq_id LEFT JOIN foto f on e.eq_id = f.eq_id LEFT JOIN sede s on C.sede_id = s.sede_id WHERE C.colab_id= ?;', colab_id, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/colaborador/', function (req,res){
  const sql = 'SELECT * FROM colaborador';
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

// Port 8000 for Heroku App Engine
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