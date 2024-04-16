const db = require('../util/database');

module.exports = class Correos {
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
    static async emailpregunta(id_p) {
        const querye = 'SELECT p.descripcion FROM pregunta p WHERE idPregunta = ?';
        const [rows] = await db.execute(querye, [id_p]);
        return rows;
    }
}
