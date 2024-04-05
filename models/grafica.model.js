const db = require('../util/database');

exports.StarAvg = (marca,categoriaS) => {
    let query = `SELECT MONTH(r.Fecha) as Mes, AVG(Puntaje) as Promedio
    FROM review r
    JOIN venta v ON r.fk_review_venta = v.idventa 
    JOIN producto p ON v.fk_venta_producto = p.idproducto
    WHERE fk_idMarca_Producto = ?
    GROUP BY MONTH(r.Fecha)
    ORDER BY MONTH(r.Fecha) ASC`;

    return db.execute(query,[marca])
        .then(([rows]) => {
            if (rows.length > 0) {
                return rows.map(row => {
                    return {
                        mes: row.Mes,
                        promedio: row.Promedio
                    };
                });
            }
            return [];
        })
        .catch(err => {
            console.log('Error obteniendo la información', err);
            throw err;
        });
};

exports.tasaDeRespuesta = () => {
    let query1 = `SELECT ReviewsContestadas();`;
    let query2 = `SELECT Reviewsenviadas();`;

    return Promise.all([db.execute(query1), db.execute(query2)])
        .then(([resultContestadas, resultEnviadas]) => {
            let contestadas = resultContestadas[0][0]['ReviewsContestadas()'];
            let enviadas = resultEnviadas[0][0]['Reviewsenviadas()'];

            let resultado = (contestadas / enviadas) * 100;

            return resultado;
        })
        .catch(err => {
            console.error('Error obteniendo la información para la tasa de respuesta:', err);
            throw err; 
        });
};

exports.ReviewsSentxMonth = () => {
    let query = `SELECT 
    MONTH(Fecha) AS Mes,
    COUNT(*) AS Cantidad_Envios
FROM 
    review
GROUP BY 
    MONTH(Fecha)
ORDER BY 
    MONTH(Fecha);`;

    return db.execute(query)
        .then(([rows]) => {
            if (rows.length > 0) {
                return rows.map(row => {
                    return {
                        mes: row.Mes,
                        enviadas: row.Cantidad_Envios,
                    };
                });
            }
            return [];
        })
        .catch(err => {
            console.log('Error obteniendo la información', err);
            throw err;
        });
};