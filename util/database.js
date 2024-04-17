const mysql = require('mysql2');

// usar la conexion a la base de datos que vayamos a utilizar
const conection = mysql.createPool({
    host: 'http://146.190.127.1/',
    user: 'magnusstellaip',
    database: 'magnusstella',
    password: 'waspy0hasCik_paqFYW',
});

module.exports = conection.promise();