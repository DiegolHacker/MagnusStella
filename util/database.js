const mysql = require('mysql2');

// usar la conexion a la base de datos que vayamos a utilizar
const conection = mysql.createPool({
    host: 'http://146.190.127.1/',
    user: 'magnusstella',
    database: 'magnusstella',
    password: 'waspy0hasCikpaqfyw',
});

module.exports = conection.promise();