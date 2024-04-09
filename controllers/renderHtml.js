const { response } = require("express");
const Usuarios = require("../models/usuarios.model");
const Correo = require("../models/correo.model");

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
    Correo.fetch(marca).
    then((rows) => {
        // let objeto
        // for(let row of rows[0]){
        //     if(row.Tipo == 1 || row.Tipo == 3 || row.Tipo == 4){
        //         Correo.fetchOpcines(row.idPregunta)
        //         .then((opciones) => {
        //             // console.log(typeof opciones[0])
        //             let opc = opciones[0]
        //             row = {row, opc}

        //             if(objeto === undefined){
        //                 objeto = row;
        //             } else{
        //                 objeto = {objeto, row};
        //             }
        //             console.log("---------------------------------------------------------------------------------------------------")
        //             console.log(objeto)

        //             // row.Opcion.concat(opciones[0]);
        //             // let newArray = oneArray.concat(opciones[0])
        //             console.log(row)
        //         })
        //         .catch((err) => {console.log(err)})
        //     }else{
        //         if(objeto === undefined){
        //             objeto = row;
        //         } else{
        //             objeto = {objeto, row};
        //         }
        //         console.log("---------------------------------------------------------------------------------------------------")
        //         console.log(objeto)
        //     }
        // }

        // console.log("-----------------------________________________________________________------------------------------------")
        // console.log(objeto)

        response.render("correos", {
            titulo: "Correos",
            marca: marca,
            preguntas: rows[0],
        })
    })
    .catch(err => {
        console.log(err)
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

