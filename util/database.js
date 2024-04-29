const mysql = require("mysql2");
require("dotenv").config();

// usar la conexion a la base de datos que vayamos a utilizar
const conection = mysql.createPool({
  host: process.env.DB_HOST,
  user: "root",
  database: "magnusstella",
  password: "Trucopablo11",
});

module.exports = conection.promise();
