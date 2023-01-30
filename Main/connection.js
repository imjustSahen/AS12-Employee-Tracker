const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_NAME,
    database: process.env.DB_USER,
    passwor: process.env.DB_PASSWORD,
  },
  console.log(`You're now connected to ${process.env.DB_NAME}`)
);

module.exports = connection;
