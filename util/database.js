const mysql = require('mysql2');

// usar la conexion a la base de datos que vayamos a utilizar
const conection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'MagnusStella',
    password: 'Temp-946456',
});

module.exports = conection.promise();