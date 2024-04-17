const mysql = require('mysql2');

// usar la conexion a la base de datos que vayamos a utilizar
const conection = mysql.createPool({
    host: '146.190.127.1',
    user: 'root',
    database: 'magnusstella',
    password: 'janzypfypsab4cYgko',
});

module.exports = conection.promise();