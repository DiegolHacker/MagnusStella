const db = require('../util/database')

module.exports = class Usuario {

    constructor(mi_username, mi_password, mi_rol){
        this.username = mi_username;
        this.password = mi_password;
        this.rol = mi_rol;
    }

    static getPermisos(username){
        return db.execute(
        `select Permisos from usuario u, rol r
        where u.IDrol= r.IDrol and u.usuario = ?`, [username]);
    }

    

}