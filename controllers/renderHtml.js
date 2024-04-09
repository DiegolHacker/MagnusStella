const { response } = require("express");
const Usuarios = require("../models/usuarios.model");

exports.post_marca = (request, response, next) => {
    request.session.marca = "xxx";
}

exports.get_usuarios = (request, response, next) => {
    const marca = request.params.marca;

    Usuarios.fetch()
    .then(rows => {
        response.render('usuarios', { 
            usuarios: rows[0], 
            titulo:"Usuarios", 
            marca: marca,
        });
    }).catch(error => console.log(error))

};

exports.get_correos = (request, response, next) => {
    const marca = request.params.marca
    response.render("correos", {
        titulo: "Correos",marca:marca
    })
}


exports.get_editar = (request, response, next) => {
    console.log("Ruta get_editar" )

    const marca = request.params.marca;

    Usuarios.fetch(request.params.usuario_id).then(([rows, fieldData]) => {
        response.render('editar_usuarios', {
            usuarios: rows, 
            titulo:"Usuarios", 
            marca: marca,
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
            response.redirect('/usuarios');
        })
        .catch((error) => {console.log(error)});

};

