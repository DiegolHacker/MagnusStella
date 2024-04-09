const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuarios {
    constructor(name, email, password, idUser, IdRol,image,estado){
        this.nombre = name;
        this.email = email;
        this.contrasena = password;
        this.idUsuario = idUser;
        this.idRol = IdRol;
        this.image = image;
        this.estado = estado;
    }

    save() {
        const userData = {
            idUsuario: this.idUsuario,
            IdRol: this.idRol,
            Nombre: this.nombre,
            Contrasena: this.contrasena,
            Correo: this.email,
            Image: this.image,
            Estado: this.estado,
        }

        return bcrypt.hash(userData.Contrasena, 12)
            .then((hashedPassword) => {
                userData.Contrasena = hashedPassword;
                const values = Object.values(userData);
                return db.execute('INSERT INTO usuario (idUsuario,IdRol,Nombre,Contrasena,Correo,Imagen,Estado) VALUES (?,?,?,?,?,?,?)',values);
            })
            .then(([result]) => {
                console.log('Usuario Guardado:', result);
                return result; // Return the ResultSetHeader
            })
            .catch(err => {
                console.log('Error guardando usuario:', err);
                throw err;
            });
    } 


    static findByEmail(email) {
        return db.execute('SELECT * FROM usuario WHERE Correo = ?', [email])
            .then(([rows]) => {
                if (rows.length > 0) {
                    const userData = rows[0];
                    console.log('Esto es lo que esta recuperando de la base de datos: ', userData)
                    const user = new Usuarios(userData.Nombre, userData.Correo, userData.Contrasena, userData.idUsuario, userData.IDRol,userData.Image, userData.Estado);
                    console.log('Esto es lo que se va a retornar: ',user);
                    return { user: user, passwordMatch: true }; // Return user data with passwordMatch true
                }
                return { user: null, passwordMatch: false }; // Return null user and passwordMatch false if user not found
            })
            .catch(err => {
                console.error('Error fetching user by email from database:', err);
                throw err;
            });
    }


    static fetchAll() {
        return db.execute("SELECT * FROM usuario")
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM usuario WHERE idUsuario=?', 
            [id]);
    }

    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }
}