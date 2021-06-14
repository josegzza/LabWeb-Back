const mysql = require('mysql');
const Sequelize = require('sequelize')
require('dotenv').config()

/*
const connection = new Sequelize(process.env.DB_DATABASE,process.env.DB_USER,process.env.DB_PASS, {
  host : process.env.DB_HOST,
  dialect: 'mysql',
})

  connection.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })
*/
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
});

  connection.connect(function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connected as thread id: ' + connection.threadId);
  });

  module.exports = connection;
