const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuarios {
    constructor(name, email, password, idUser, IdRol){
        this.nombre = name;
        this.email = email;
        this.contrasena = password;
        this.idUsuario = idUser;
        this.idRol = IdRol;
    }

    save() {
        const userData = {
            idUsuario: this.idUsuario,
            IdRol: this.idRol,
            Nombre: this.nombre,
            Contrasena: this.contrasena,
            Correo: this.email,
        }


        return bcrypt.hash(userData.Contrasena, 12)
            .then((hashedPassword) => {
                userData.Contrasena = hashedPassword;
                const values = Object.values(userData);
                return db.execute('INSERT INTO usuario (idUsuario,IdRol,Nombre,Constraseña,Correo) VALUES (?,?,?,?,?)',values);
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

    static findByEmail(email,password){
        console.log(email,password)
        return db.execute('SELECT * FROM usuario WHERE Correo = ?',[email])
            .then(([rows]) =>{
                if(rows.length > 0){
                    const user = rows[0];

                    //comparar la contrasena 
                    console.log('Hashed', user.Contrasena);
                    console.log('Mail', user.Correo);
                    //aqui .compare recibe un undefined
                    return bcrypt.compare(password,user.Contrasena)
                        .then(doMatch => {
                            return{ user: user, passwordMatch: doMatch};
                        })
                }
                return{user:null,passwordMatchs:false};
            })
            .catch(err => {
                console.log("Error encontrando usuario en la base de datos",err);
                throw err;
            })
    }

    // static findByEmail(email) {
    //     return db.execute('SELECT * FROM usuario WHERE Correo = ?', [email])
    //         .then(([rows]) => {
    //             if (rows.length > 0) {
    //                 const user = rows[0];
    //                 return { user: user, passwordMatch: true }; // Return user data with passwordMatch true
    //             }
    //             return { user: null, passwordMatch: false }; // Return null user and passwordMatch false if user not found
    //         })
    //         .catch(err => {
    //             console.error('Error fetching user by email from database:', err);
    //             throw err;
    //         });
    // }


    static fetchAll(){
        db.execute('SELECT * FROM usuarios')
            .then(rows => {
                callback(rows);
            })
            .catch(err => {
                console.error('Error fetching users from database:', err);
                callback([]);
            });
    }
}