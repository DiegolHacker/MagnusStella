const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Correo {


    static fetchAll() {
        return db.execute("SELECT * FROM pregunta")
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM pregunta WHERE fk_pregunta_idmarca=?', 
            [id]);
    }

    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }

    static fetchOpcines(id){
        return db.execute('SELECT * FROM opcion WHERE id_pregunta=?', 
            [id]);
    }
}