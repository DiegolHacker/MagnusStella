const Usuarios = require("../models/usuarios.model");

exports.post_marca = (request, response, next) => {
    request.session.marca = "xxx";
}

exports.get_usuarios = (request, response, next) => {
    const marca = request.params.marca;
    const pag = parseInt(request.params.pag) || 1; // Asegúrate de que 'pag' sea un número

    Usuarios.fetchPag(pag)
    .then(result => {
        // console.log(result.users)
        response.render('usuarios', { 
            usuarios: result.users, 
            titulo: "Usuarios", 
            marca: marca || "LU1",
            currentPage: pag,
            pageSize: result.pageSize,
            totalUsers: result.totalUsers,
            totalPages: result.totalPages,
            ruta: "/usuarios/" + pag 
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
            marca: marca || "LU1",
            ruta: "/usuarios/editar/" +  request.params.usuario_id,
        });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.post_editar = (request, response, next) => {
    console.log("/editar");

    var correo = request.body.correo || "";
    var password = request.body.password || "";
    var IdRol = request.body.idrol || "";
    var idUser = request.body.uIdusuario || "";
    console.log(correo)

    Usuarios.saveUsernameChanges(IdRol, password, correo, idUser)
        .then(() =>{
            console.log("Guardado")
            response.redirect('/usuarios/1/LU1');
        })
        .catch(err => {
            console.log("Error al hacer el guardado:",err);
            response.redirect('/usuarios/1/LU1')
        });

};

exports.post_delete = (request, response, next) => {
    Usuarios.delete(request.body.id)
        .then(() => {
            return Usuarios.fetch();
    })
    .then(([usuarios, fieldData]) => {
        return response.status(200).json({usuarios: usuarios})
        })
    .catch((error) => {console.log(error)});
};