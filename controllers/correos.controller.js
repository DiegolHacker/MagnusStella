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
            csrfToken: request.csrfToken(),
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
            csrfToken: request.csrfToken(),
            marca: marca || "LU1",
            ruta: "/emails/correos",
            idp:idp,
            tipos: tipo,
            opciones: opciones,
            pregunta:pregunta,
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

exports.get_correos_crear = async (request, response, next) => {
    const marca = request.params.marca;
    
    try {
        const marca = request.params.marca;
        // Ahora renderiza con los datos obtenidos
        response.render("crear_correos", {
            titulo: "Correos",
            csrfToken: request.csrfToken(),
            marca: marca || "LU1",
            ruta: "/emails/correos",
            permisos: request.session.permisos || []
        });
    } catch (error) {
        console.error('Error al cargar las preguntas:', error);
        response.status(500).send('Error interno del servidor');
    }
};

exports.post_crear_correos = (request,response,next) => {
    const marca = request.params.marca
    const {question, tipo} = request.body;
    const opciones = [];

    Object.keys(request.body).forEach(key => {
        if (key.startsWith("op_")) {
            opciones.push(request.body[key]);
        }
    });

    if (!question || !tipo || opciones.length === 0) {
        return response.render("crear_correos", {
            titulo: "Correos",
            error: "Llena todos los campos",
            marca: marca || "LU1",
            ruta: "/emails/correos",
            permisos: request.session.permisos || []
        });
    }
    console.log("Pregunta:", question);
    console.log("Tipo:", tipo);
    console.log("Opciones:", opciones);

    const pregunta = new Correos(question,tipo, opciones);
    console.log(pregunta)
    pregunta.save()
        .then(() =>{
            response.redirect('/emails/correos/' + marca);
        })
        .catch(err => {
            console.log("Error al hacer el signup:",err);
            response.redirect('/emails/correos/' + marca);
        });
}


