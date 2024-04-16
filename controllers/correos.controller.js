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
        const marca = request.params.marca;
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

exports.post_editar_correos = async (request, response, next) => {
    try {
        const pregunta = request.body.pregunta || "";
        const idPregunta = request.body.idp || "";
        const marca = request.body.marca || "";
        const opciones = [];
        const idOpciones = [];

        // Recuperar las opciones y sus IDs del body
        for (const key in request.body) {
            if (key.startsWith("opcion_")) {
                opciones.push(request.body[key]);
                // Extraer el ID de la opción del nombre del campo
                const opcionId = key.replace("opcion_", "");
                idOpciones.push(opcionId);
            }
        }

        // Guardar la pregunta modificada
        await Correos.saveQuestionChanges(pregunta, idPregunta);

        // Guardar las opciones modificadas
        for (let i = 0; i < opciones.length; i++) {
            await Correos.saveEmailChanges(opciones[i], idOpciones[i]);
        }
        console.log(marca);
        console.log("Guardado exitosamente");
        response.redirect('/emails/correos/' + marca);

    } catch (error) {
        console.log("Error al guardar:", error);
        response.status(500).send("Error interno del servidor");
    }
};
