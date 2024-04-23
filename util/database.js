const mysql = require('mysql2');

// usar la conexion a la base de datos que vayamos a utilizar
const conection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'magnusstella',
    password: 'cucu5352',
});

module.exports = conection.promise();