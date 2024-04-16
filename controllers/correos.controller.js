const { response } = require("express");
const Correos = require("../models/correos.model");


//correos
exports.get_correos = async (request, response, next) => {
    const marca = request.params.marca;

    try {
        const total = await Correos.emailpreguntas(marca); // Espera a que se resuelva la promesa
   
        const { preguntas, idp } = await Correos.emailConfiguration(marca);
        
        const tipos = [];
        const opciones = [];
        const total_opciones=[];
        for (let i = 0; i < total; i++) {
            const tipo = await Correos.emailtipo_pre(idp[i].idPregunta);
            const opcion  = await Correos.emailopciones(idp[i].idPregunta);
            const to_opcion = await Correos.emailcountopcion(idp[i].idPregunta);
            tipos.push(tipo);
            opciones.push(opcion); 
            total_opciones.push(to_opcion);
        }
    
        // Ahora renderiza con los datos obtenidos
        response.render("correos", {
            preguntas: preguntas,
            titulo: "Correos",
            marca: marca || "LU1",
            ruta: "/emails/correos",
            idp:idp,
            total: total,
            tipos: tipos,
            opciones: opciones,
            idp:idp,
            total_opciones: total_opciones,
            permisos: request.session.permisos || []
        });
    } catch (error) {
        console.error('Error al cargar las preguntas:', error);
        response.status(500).send('Error interno del servidor');
    }
};

exports.get_correos_editar = async (request, response, next) => {
    const marca = request.params.marca;
    const idp = request.params.pregunta_id;

    try {
        const [tipo] = await Correos.emailtipo_pre(idp);
        const opciones  = await Correos.emailopciones(idp);
        const to_opcion = await Correos.emailcountopcion(idp);
        const pregunta = await Correos.emailpregunta(idp);
        console.log(pregunta);
    
        // Ahora renderiza con los datos obtenidos
        response.render("editar_correos", {
            titulo: "Correos",
            marca: marca || "LU1",
            ruta: "/emails/correos",
            idp:idp,
            tipos: tipo,
            opciones: opciones,
            pregunta:pregunta,
            idp:idp,
            total_opciones: to_opcion,
            permisos: request.session.permisos || []
        });
    } catch (error) {
        console.error('Error al cargar las preguntas:', error);
        response.status(500).send('Error interno del servidor');
    }
};

