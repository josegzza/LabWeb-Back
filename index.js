require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./server/db-connection');

//configuracion global de rutas
// app.use(require('./routes/main'));

//Routes
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/', function (req, res) {
  // res.sendFile(path.resolve(__dirname, '../client/login.html'));
  res.send("Welcome to my api!")
})

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
