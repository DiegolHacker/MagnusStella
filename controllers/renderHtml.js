exports.get_dashboard = (request, response,next) => {
    response.render("dashboard", {
        titulo: 'Dashboard',
    })
};

exports.post_marca = (request, response, next) => {
    request.session.marca = "caca";
}

exports.get_usuarios = (request, response, next) => {
    const usuarios = [
        { id: 1, nombre: "Angélica Ríos Cuentas", correo: "A01705651@tec.mx", rol: "Admin", estado: "Activo" },
        { id: 2, nombre: "Diego Fuentes Juvera", correo: "A01705506@tec.mx", rol: "CRM", estado: "Activo" },
        { id: 3, nombre: "Juan Pablo Chávez", correo: "A01705408@tec.mx", rol: "CRM", estado: "Inactivo" },
        { id: 4, nombre: "Diego Ricardo Alfaro", correo: "A01709971@tec.mx", rol: "Analítica", estado: "Activo" },
        { id: 5, nombre: "Pablo Hazael Hurtado", correo: "A01710778@tec.mx", rol: "Analítica", estado: "Inactivo" }
    ];
    response.render('usuarios', { usuarios: usuarios, titulo:"Usuarios" });
};


exports.get_login = (request, response, next) => {
    response.render("login")
}

exports.get_resenas = (request, response,next) => {
    response.render("resenas", {
        titulo: 'Reseñas',
    })
};


exports.get_correos = (request, response, next) => {
    response.render("correos", {
        titulo: "Correos",
    })
}


exports.get_resenas_completas = (request, response,next) => {
    response.render("resenas_completas", {
        titulo: 'Reseñas',
    })
};
exports.get_resenas = (request, response,next) => {
    const resenas = [
        { itemcode: "LB3231", title: "Cama Condesa-INDI", resena_descrip:"Gran compra", estrellas: 5 },
        { itemcode: "LB2231", title: "Cama Anzures-INDI", resena_descrip:"Buen producto", estrellas: 4 },
        { itemcode: "LU1001B2", title: "Luuna Colchón Basic 2-INDI", resena_descrip:"Tardo mucho en llegar", estrellas: 3 },
        { itemcode: "LU1002B2", title: "Luuna Colchón Basic 2-MATRI", resena_descrip:"Cumplio las expectativas", estrellas: 4 },
        { itemcode: "LU1003B2", title: "Luuna Colchón Basic 2-QUEEN", resena_descrip:"Producto llegó dañado", estrellas: 3 },
        { itemcode: "LU1004B2", title: "Luuna Colchón Basic 2-KING", resena_descrip:"Excelente calidad", estrellas: 5 },
        { itemcode: "LB2304", title: "Cama Nuevo León-KING", resena_descrip:"La entrega tardó mucho más de lo esperado", estrellas: 2 },
        { itemcode: "LB2303", title: "Cama Nuevo León-QUEEN", resena_descrip:"Gran compra", estrellas: 5 },
        { itemcode: "LB2302", title: "Cama Nuevo León-MATRI", resena_descrip:"Producto erroneo", estrellas: 1 },
        { itemcode: "LB2301", title: "Cama Nuevo León-INDI", resena_descrip:"Buena compra", estrellas: 4 },
        { itemcode: "BL1004HS", title: "Luuna Colchón Blue High Support-KING", resena_descrip:"Muy recomendado", estrellas: 5 },
        { itemcode: "BL1003HS", title: "Luuna Colchón Blue High Support-QUEEN", resena_descrip:"Un muy buen producto", estrellas: 4 },
        { itemcode: "BL1002HS", title: "Luuna Colchón Blue High Support-MATRI", resena_descrip:"Extremadamente cómodo", estrellas: 4 },
        { itemcode: "BL1001HS", title: "Luuna Colchón Blue High Support-INDI", resena_descrip:"Buena compra", estrellas: 3 },
        { itemcode: "LU1004B3", title: "Luuna Colchón Basic air B3-KING", resena_descrip:"Tardo meses en llegar", estrellas: 0 },
        { itemcode: "LU1003B3", title: "Luuna Colchón Basic air B3-QUEEN", resena_descrip:"Me encanto", estrellas: 5 },
    ];
    response.render("resenas", { resenas: resenas, titulo:"Reseñas" });
};
exports.get_analitica = (request, response, next) => {
    response.render("analitica", {
        titulo: 'Analitica',
    })
}