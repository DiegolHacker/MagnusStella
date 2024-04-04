const db = require('../util/database.js');


module.exports = class Reviews {
    constructor(id, idventa, description, title, date, punctuation, marc){
        this.idReview = id;
        this.review_Venta = idventa;
        this.descripcion = description;
        this.titulo = title;
        this.fecha = date;
        this.puntuacion = punctuation;
        this.marca = marc;
    }

    static fetchAll(callback){
        const query = `
        SELECT 
            r.idReview AS idreview, 
            r.Descripcion AS descripcion, 
            r.Titulo AS titulo, 
            r.Fecha AS fecha, 
            r.Puntaje AS puntaje, 
            v.Fk_Venta_Producto AS idProducto, 
            p.FK_idMarca_Producto AS marca
        FROM 
            review r
        JOIN 
            venta v ON r.Fk_Review_Venta = v.idVenta
        JOIN 
            producto p ON v.Fk_Venta_Producto = p.idProducto `;
        
    db.execute(query)
        .then(([rows]) => {
            callback(null, rows);
        })
        .catch(err => {
            console.error('Error fetching reviews and product IDs from database:', err);
            callback(err, []);
        });
}

    static fetchCompleto(idReview, callback){
        const query = `
        SELECT 
            c.nombre AS nombre_cliente,
            p.nombre AS nombre_producto,
            r.Puntaje AS estrellas_resena,
            r.Titulo AS titulo_resena,
            r.Descripcion AS descripcion_resena,
            r.idReview AS id_review_resena,
            pre.Descripcion AS pregunta,
            resp.Respuestas AS respuesta,
            p.FK_idMarca_Producto AS marca

        FROM 
            cliente c
        JOIN 
            venta v ON c.idCliente = v.Fk_Venta_Cliente
        JOIN 
            producto p ON v.Fk_Venta_Producto = p.idProducto
        JOIN 
            review r ON v.idVenta = r.Fk_Review_Venta
        JOIN
            respuestas resp ON r.idReview = resp.FK_Respuestas_Review 
        JOIN
            pregunta pre ON resp.Fk_Respuestas_Pregunta = pre.idPregunta

        WHERE
            r.idReview = ?`;

        db.execute(query, [idReview])
        .then(([rows]) => {
            if(rows.length > 0) {
                callback(null, rows[0]); // Devuelve solo la primera fila encontrada
            } else {
                callback(new Error('Review not found'), null);
            }
        })
        .catch(err => {
            console.error('Error fetching complete review from database:', err);
            callback(err, null);
        });
    }
}