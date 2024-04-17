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
    console.log("Esto existe en request.body");
    console.log(request.body);

    var correo = request.body.correo || "";
    var password = request.body.password || request.body.uPassword;
    var IdRol = request.body.idrol || "";
    var idUser = request.body.uIdusuario || "";
    var name = request.body.uName || "";
    var correo = request.body.uCorreo || "";
    var image = request.body.uImage || "";

    console.log(name);
    console.log(correo);
    console.log(password);
    console.log(image);
    console.log(IdRol);
    console.log(idUser);

    const usuarios = new Usuarios(name,correo,password,image,IdRol,idUser);
    console.log("Esto existe en usuarios" + usuarios[1])

    usuarios.saveUsernameChanges()
        .then(() =>{
            console.log("Guardado")
            response.redirect('/usuarios/1/LU1');
        })
        .catch(err => {
            console.log("Error al hacer el guardado:",err);
            response.redirect('/usuarios/1/LU1')
        });

};
