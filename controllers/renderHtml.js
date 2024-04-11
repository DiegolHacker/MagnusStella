const { response } = require("express");
const Usuarios = require("../models/usuarios.model");

exports.post_marca = (request, response, next) => {
    request.session.marca = "xxx";
}

exports.get_usuarios = (request, response, next) => {
    const marca = request.params.marca;
    const pag = parseInt(request.params.pag) || 1; // Asegúrate de que 'pag' sea un número

    Usuarios.fetchPag(pag)
    .then(result => {
        console.log(result.users)
        response.render('usuarios', { 
            usuarios: result.users, 
            titulo: "Usuarios", 
            marca: marca,
            currentPage: pag,
            pageSize: result.pageSize,
            totalUsers: result.totalUsers,
            totalPages: result.totalPages,
            ruta: "/usuarios/:marca/:currentPage" 
        });
    }).catch(error => {
        console.log(error);
        response.status(500).send('Error al recuperar los usuarios');
    });
};




exports.get_editar = (request, response, next) => {
    console.log("Ruta get_editar" )

    const marca = request.params.marca;

    Usuarios.fetch(request.params.pag, request.params.usuario_id).then(([rows, fieldData]) => {
        response.render('editar_usuarios', {
            usuarios: rows, 
            titulo:"Usuarios", 
            marca: marca,
            ruta: "/usuarios/editar/:marca/:usuario.IDRol" 
        });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.post_editar = (request, response, next) => {
    console.log("/editar")
    console.log(request.body);

    var correo = request.body.correo || "";
    var password = request.body.password || "";
    var idrol = request.body.idrol || "";
    var idusuario = request.body.idusuario || "";

    console.log(request.params.usuario_id)

    Usuarios.saveUsernameChanges(correo, password, idrol, idusuario)
        .then(() => {
            console.log("Guardado")
            response.redirect('/');
        })
        .catch((error) => {console.log(error)});

};

//correos

exports.get_correos = (request, response, next) => {
    const marca = request.params.marca

    Usuarios.emailConfiguration(marca)
    .then((rows) => {
        console.log(rows);

        response.render("correos", {
            preguntas: rows[0],
            titulo: "Correos",
            marca: marca,
            ruta: "/reviews/correos"
        })
    })
    .catch((error) => {console.log(error)});

}