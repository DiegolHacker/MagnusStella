const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuarios {
    constructor(name, email, password,image,IdRol,idUser, estado){
        this.nombre = name;
        this.email = email;
        this.contrasena = password;
        this.image = image;
        this.idRol = IdRol;
        this.idUsuario = idUser;
        this.estado = estado;
    }

    save() {
        const userData = {
            IdRol: this.idRol,
            Nombre: this.nombre,
            Contrasena: this.contrasena,
            Correo: this.email,
            Image: this.image,
            Estado: 1,
        }

        return bcrypt.hash(userData.Contrasena, 12)
            .then((hashedPassword) => {
                userData.Contrasena = hashedPassword;
                const values = Object.values(userData);
                // console.log(values)
                return db.execute('INSERT INTO usuario (IdRol,Nombre,Password,Correo,Imagen,Estado) VALUES (?,?,?,?,?,?)',values);
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
                    const user = new Usuarios(userData.Nombre, userData.Correo, userData.Password, userData.idUsuario, userData.IDRol,userData.Image, userData.Estado);
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
        return db.execute("SELECT * FROM usuario ")
    }

    static fetchPag(pag) {
        total= db.execute("SELECT COUNT(IdUsuario) AS totalUsuarios FROM usuario;")
        total = total/5;
        inicio = (pag - 1)*total
        return db.execute("SELECT * FROM usuario order by Nombre LIMIT ?, ?",[inicio,total])
    }

    static async fetchPag(pag) {
        try {
            const [rows] = await db.execute("SELECT COUNT(IdUsuario) AS totalUsuarios FROM usuario;");
            let totalUsers = rows[0].totalUsuarios;
            const pageSize = 5; 
            let totalPages = Math.ceil(totalUsers / pageSize); 
            let inicio = (pag - 1) * pageSize;

            const [users] = await db.execute(`SELECT * FROM usuario ORDER BY Nombre LIMIT ${inicio}, ${pageSize}`);
    
            return {
                users: users,
                pageSize: pageSize,
                totalUsers: totalUsers,
                totalPages: totalPages
            };
        } catch (err) {
            console.error('Error fetching paginated users:', err);
            throw err; 
        }
    }
    

    static fetchOne(id) {
        return db.execute('SELECT * FROM usuario WHERE idUsuario=?', 
            [id]);
    }

    static fetch(pag, id) {
        if (pag, id) {
            return this.fetchOne(id);
        } else if (pag) {
            return this.fetchPag(pag);
        } else {
            return this.fetchAll();
        }
    }

    static saveUsernameChanges(correo, password, idrol, idusuario){
        return db.execute('UPDATE usuario SET IDRol = ?, Password = ?, Correo = ? WHERE (idUsuario = ?)',
        [idrol, password, correo, idusuario]);
    }
    static async emailConfiguration(id) {
        const query1 = `SELECT p.descripcion FROM pregunta p WHERE fk_pregunta_idmarca = ?`;
        const query2 = `SELECT p.idPregunta FROM pregunta p WHERE fk_pregunta_idmarca = ?`;
        const [rows1] = await db.execute(query1, [id]);
        const [rows2] = await db.execute(query2, [id]);
        return { preguntas: rows1, idp: rows2 };
    }
    

    static async emailtipo_pre(id_p) {
        const query = 'SELECT p.tipo FROM pregunta p WHERE idPregunta = ?';
        const [tipo] = await db.execute(query, [id_p]);
        return tipo;
    }

    static async emailpreguntas(marca) {
        const query = 'SELECT COUNT(IdPregunta) as count FROM Pregunta WHERE fk_pregunta_idmarca = ?';
        const [rows] = await db.execute(query, [marca]);
        return rows[0].count;
    }

    static async emailcountopcion(preg) {
        const query = 'SELECT COUNT(idopciones) as count FROM opciones WHERE fk_opciones_pregunta = ?';
        const [rows] = await db.execute(query, [preg]);
        return rows[0].count;
    }

    static async emailopciones(id_p) {
        const querye = 'SELECT o.descripcion FROM opciones o WHERE fk_opciones_pregunta = ?';
        const [rows] = await db.execute(querye, [id_p]);
        return rows;
    }
}