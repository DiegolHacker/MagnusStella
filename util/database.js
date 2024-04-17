const mysql = require('mysql2');

// usar la conexion a la base de datos que vayamos a utilizar
const conection = mysql.createPool({
    host: '146.190.127.1',
    user: 'magnusstella',
    database: 'MagnusStella',
    password: 'waspy0hasCikpaqfyw',
});

module.exports = conection.promise();