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
        // console.log(result.users)
        response.render('usuarios', { 
            usuarios: result.users, 
            titulo: "Usuarios", 
            marca: marca || "LU1",
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
            marca: marca || "LU1",
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
            response.redirect('/usuarios/LU1/1');
        })
        .catch((error) => {console.log(error)});

};

//correos
exports.get_correos = async (request, response, next) => {
    const marca = request.params.marca;

    try {
        const total = await Usuarios.emailpreguntas(marca); // Espera a que se resuelva la promesa
   
        const { preguntas, idp } = await Usuarios.emailConfiguration(marca);
        
        const tipos = [];
        const opciones = [];
        const total_opciones=[];
        for (let i = 0; i < total; i++) {
            const tipo = await Usuarios.emailtipo_pre(idp[i].idPregunta);
            const opcion  = await Usuarios.emailopciones(idp[i].idPregunta);
            const to_opcion = await Usuarios.emailcountopcion(idp[i].idPregunta);
            tipos.push(tipo);
            opciones.push(opcion); 
            total_opciones.push(to_opcion);
        }
    
        

        // Ahora renderiza con los datos obtenidos
        response.render("correos", {
            preguntas: preguntas,
            titulo: "Correos",
            marca: marca || "LU1",
            ruta: "/reviews/correos",
            total: total,
            tipos: tipos,
            opciones: opciones,
            total_opciones: total_opciones
        });
    } catch (error) {
        console.error('Error al cargar las preguntas:', error);
        response.status(500).send('Error interno del servidor');
    }
};
