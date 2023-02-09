const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

  },

);

connection.connect(function (err, connection) {
  if (err) {
  console.log(err)
}
console.log(`You're now connected to ${process.env.DB_NAME}`)
})

module.exports = connection;