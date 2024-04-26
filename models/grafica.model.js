const { search } = require("../routes/routes1.routes");
const db = require("../util/database");

exports.StarAvgLine = (marca, categoriaS, productoS, startDate, endDate) => {
  //tabla review
  let query = `SELECT MONTHNAME(r.Fecha) as Mes, AVG(Puntaje) as Promedio
    FROM review r
    JOIN venta v ON r.fk_review_venta = v.idventa 
    JOIN producto p ON v.fk_venta_producto = p.idproducto
    WHERE fk_idMarca_Producto = ?`;
  let parametros = [marca];

  if (categoriaS !== "*") {
    query += `
    AND Categoria = ?`;
    parametros.push(categoriaS);
  }

  if (productoS !== "*") {
    query += `
    AND p.idProducto = ?`;
    parametros.push(productoS);
  }

  if (startDate !== "*" && endDate !== "*") {
    query += ` AND v.Fecha BETWEEN ? AND ?`;
    parametros.push(startDate, endDate);
  } else if (startDate !== "*") {
    query += ` AND v.Fecha >= ?`;
    parametros.push(startDate);
  } else if (endDate !== "*") {
    query += ` AND v.Fecha <= ?`;
    parametros.push(endDate);
  }

  // agregar WHERE star fecha y final fecha = a los dos parametros que le van a llegar de el ejs y push al arreglo

  query += ` 
    GROUP BY MONTHNAME(r.Fecha)
    ORDER BY MONTHNAME(r.Fecha) ASC;`;

  return db
    .execute(query, parametros)
    .then(([rows]) => {
      if (rows.length > 0) {
        return rows.map((row) => {
          return {
            mes: row.Mes,
            promedio: row.Promedio,
          };
        });
      }
      return [];
    })
    .catch((err) => {
      console.log("Error obteniendo la información", err);
      throw err;
    });
};

exports.tasaDeRespuesta = (marca, categoriaS, productoS) => {
  let query1 = `SELECT ReviewsContestadasM(?)`;
  let query2 = `SELECT ReviewsEnviadasM(?)`;
  let q1String = "ReviewsContestadasM(?)";
  let q2String = "ReviewsEnviadasM(?)";
  let parametros = [marca];

  if (categoriaS !== "*") {
    query1 = `SELECT ReviewsContestadasMC(?,?)`;
    query2 = `SELECT ReviewsEnviadasMC(?,?)`;
    q1String = "ReviewsContestadasMC(?,?)";
    q2String = "ReviewsEnviadasMC(?,?)";
    parametros.push(categoriaS);
  }

  if (productoS !== "*") {
    query1 = `SELECT ReviewsContestadasP(?)`;
    query2 = `SELECT ReviewsEnviadasP(?)`;
    q1String = "ReviewsContestadasP(?)";
    q2String = "ReviewsEnviadasP(?)";
    parametros = [productoS];
  }

  // agregar WHERE star fecha y final fecha = a los dos parametros que le van a llegar de el ejs y push al arreglo

  return Promise.all([
    db.execute(query1, parametros),
    db.execute(query2, parametros),
  ])
    .then(([resultContestadas, resultEnviadas]) => {
      let contestadas = resultContestadas[0][0][q1String];
      let enviadas = resultEnviadas[0][0][q2String];

      let resultado = (contestadas / enviadas) * 100;

      return resultado;
    })
    .catch((err) => {
      console.error(
        "Error obteniendo la información para la tasa de respuesta:",
        err
      );
      // throw err;
    });
};

exports.ReviewsSentxMonth = (
  marca,
  categoriaS,
  productoS,
  startDate,
  endDate
) => {
  //tabla venta
  let query = `SELECT 
    MONTHNAME(v.fecha) AS mes,
    COUNT(*) AS Cantidad_Enviadas
FROM 
    venta v
INNER JOIN 
    producto p ON v.fk_venta_producto = p.idProducto
WHERE
    p.FK_idMarca_Producto = ?`;

  let parametros = [marca];

  if (categoriaS !== "*") {
    query += `
        AND p.Categoria = ?`;
    parametros.push(categoriaS);
  }

  if (productoS !== "*") {
    query += `
        AND p.idProducto = ?`;
    parametros.push(productoS);
  }

  if (startDate !== "*" && endDate !== "*") {
    query += ` AND v.Fecha BETWEEN ? AND ?`;
    parametros.push(startDate, endDate);
  } else if (startDate !== "*") {
    query += ` AND v.Fecha >= ?`;
    parametros.push(startDate);
  } else if (endDate !== "*") {
    query += ` AND v.Fecha <= ?`;
    parametros.push(endDate);
  }

  // agregar WHERE star fecha y final fecha = a los dos parametros que le van a llegar de el ejs y push al arreglo

  query += `
GROUP BY 
    MONTHNAME(v.fecha);`;

  return db
    .execute(query, parametros)
    .then(([rows]) => {
      if (rows.length > 0) {
        return rows.map((row) => {
          return {
            mes: row.mes,
            enviadas: row.Cantidad_Enviadas,
          };
        });
      }
      return [];
    })
    .catch((err) => {
      console.log("Error obteniendo la información", err);
    });
};

exports.StarAvgNumber = (marca, categoriaS, productoS, startDate, endDate) => {
  let query = `SELECT avg(Puntaje)
    FROM review r, venta v, producto p
    WHERE r.fk_review_venta = v.idventa
    AND v.fk_venta_producto = p.idproducto
AND fk_idmarca_producto = ? `;
  let parametros = [marca];

  if (categoriaS !== "*") {
    query += `
and p.categoria = ? `;
    parametros.push(categoriaS);
  }

  if (productoS !== "*") {
    query += `
AND p.idproducto = ? `;
    parametros.push(productoS);
  }

  if (startDate !== "*" && endDate !== "*") {
    query += ` AND v.Fecha BETWEEN ? AND ?`;
    parametros.push(startDate, endDate);
  } else if (startDate !== "*") {
    query += ` AND v.Fecha >= ?`;
    parametros.push(startDate);
  } else if (endDate !== "*") {
    query += ` AND v.Fecha <= ?`;
    parametros.push(endDate);
  }

  query += `;`;

  // agregar WHERE star fecha y final fecha = a los dos parametros que le van a llegar de el ejs y push al arreglo

  return db
    .execute(query, parametros)
    .then((resultContestadas) => {
      let resultado = resultContestadas[0][0]["avg(Puntaje)"];
      // console.log("holaa")
      return resultado;
    })
    .catch((err) => {
      console.error(
        "Error obteniendo la información para el promedio de estrellas:",
        err
      );
      // throw err;
    });
};

exports.search = (valor_busqueda, marca) => {
  let query = `SELECT * FROM producto WHERE idProducto = ?
    AND FK_idMarca_Producto = ?`;
  return db.execute(query, [valor_busqueda, marca]).then(([rows]) => {
    if (rows.length === 0) {
      return { error: "Producto no existente" };
    } else {
      return { error: undefined };
    }
  });
};
