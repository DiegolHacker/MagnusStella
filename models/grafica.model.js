const db = require('../util/database');

exports.StarAvg = (marca,categoriaS) => {
    let query = `SELECT MONTHNAME(r.Fecha) as Mes, AVG(Puntaje) as Promedio
    FROM review r
    JOIN venta v ON r.fk_review_venta = v.idventa 
    JOIN producto p ON v.fk_venta_producto = p.idproducto
    WHERE fk_idMarca_Producto = ?`
    let parametros = [marca];

    if (categoriaS !== '*') {
        query += `
    AND Categoria = ?`;
        parametros.push(categoriaS);
    }
    
  

    query += ` 
    GROUP BY MONTHNAME(r.Fecha)
    ORDER BY MONTHNAME(r.Fecha) ASC;`;

    return db.execute(query,parametros)
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

exports.tasaDeRespuesta = (marca,categoriaS,productoS) => {
    let query1 = `SELECT ReviewsContestadasM(?)`;
    let query2 = `SELECT ReviewsEnviadasM(?)`;
    let q1String = 'ReviewsContestadasM(?)';
    let q2String = 'ReviewsEnviadasM(?)';
    let parametros = [marca]

    if(categoriaS !== '*'){
        query1 = `SELECT ReviewsContestadasMC(?,?)`;
        query2 = `SELECT ReviewsEnviadasMC(?,?)`;
        q1String = 'ReviewsContestadasM(?,?)';
        q2String = 'ReviewsEnviadasM(?,?)';
        parametros.push(categoriaS);
    }

    if(productoS !== '*'){
        query1 = `SELECT ReviewsContestadasP(?)`;
        query2 = `SELECT ReviewsEnviadasP(?)`;
        q1String = 'ReviewsContestadasP(?)';
        q2String = 'ReviewsEnviadasP(?)';
        parametros = [productoS]
    }

    // console.log(parametros)
    return Promise.all([db.execute(query1,parametros), db.execute(query2,parametros)])
        .then(([resultContestadas, resultEnviadas]) => {
            let contestadas = resultContestadas[0][0][q1String];
            let enviadas = resultEnviadas[0][0][q2String];
   
            let resultado = (contestadas / enviadas) * 100;

            return resultado;
        })
        .catch(err => {
            console.error('Error obteniendo la información para la tasa de respuesta:', err);
            // throw err; 
        });
};

exports.ReviewsSentxMonth = (marca,productoS,categoriaS) => {
    let query = `SELECT 
    MONTHNAME(v.fecha) AS mes,
    COUNT(*) AS Cantidad_Enviadas
FROM 
    venta v
INNER JOIN 
    producto p ON v.fk_venta_producto = p.idProducto
WHERE
    p.FK_idMarca_Producto = ?`;

    let parametros = [marca]

    if(categoriaS !== '*'){
        query += `
        AND p.Categoria = ?`;
        parametros.push(categoriaS);
    }

    if(productoS !== '*'){
        query += `
        AND p.idProducto = ?`;
        parametros.push(productoS)
    }

    query += `
GROUP BY 
    MONTHNAME(v.fecha)
ORDER BY 
    mes ASC;`;


    return db.execute(query,parametros)
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
        });
};


    // if(categoriaS !== '*'){
    //     query1 = `ReviewsContestadasMC(?,?)`;
    //     query2 = `ReviewsEnviadasMC(?,?)`;
    //     parametros.push(categoriaS)
    // }

    // if(productoS !== '*'){
    //     query1 = `ReviewsContestadasP(?)`;
    //     query2 = `ReviewsEnviadasP(?)`;
    //     parametros = [productoS];
    // }