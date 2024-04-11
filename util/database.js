const mysql = require('mysql2');

// usar la conexion a la base de datos que vayamos a utilizar
const conection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'MagnusStella',
<<<<<<< HEAD
    password: 'root',
=======
    password: 'cucu5352',
>>>>>>> 4993c1fc883632b9e5dc467649aa8bb348a2ebbd
});

module.exports = conection.promise();