const Reviews = require("../models/resenas.model");
const Correos = require("../models/correos.model");

exports.get_resenas_completas = (request, response, next) => {
  const marca = request.params.marca;
  const idReview = request.params.id; // Obtiene el ID de la reseña de los parámetros de la solicitud
  // Llama al método fetchCompleto del modelo para obtener los datos de la reseña completa
  Reviews.fetchCompleto(idReview, (err, resenaCompleta) => {
    if (err) {
      return response.status(500).send("Error fetching complete review");
    }

    if (!resenaCompleta) {
      return response.status(404).send("Reseña no encontrada");
    }

    // Renderiza la vista de la reseña completa y pasa los datos de la reseña
    response.render("resenas_completas", {
      resenas: resenaCompleta,
      titulo: "Reseña Completa",
      marca: marca || "LU1",
      ruta: "/reviews/resenas/completas/:marca/:id",
      permisos: request.session.permisos || [],
    });
  });
};

exports.get_resenas = (request, response, next) => {
  const marca = request.params.marca;
  const idReview = request.params.id;
  Reviews.fetchAll(marca, (err, resenasList) => {
    if (err) {
      return response.status(500);
    }
    const resenas = resenasList.map((resena) => ({
      id: resena.idreview,
      title: resena.titulo,
      resena_descrip: resena.descripcion,
      estrellas: resena.puntaje,
      itemcode: resena.idProducto,
    }));

    response.render("resenas", {
      resenas: resenas,
      titulo: "Reseñas",
      marca: marca || "LU1",
      id: idReview,
      ruta: "/reviews/resenas",
      permisos: request.session.permisos || [],
    });
  });
};

exports.get_buscar = (request, response, next) => {
  const marca = request.params.marca;
  const valor_busqueda = request.params.valor_busqueda;
  Reviews.search(valor_busqueda, marca, (err, resenas) => {
    if (err) {
      console.log(err);
      return response.status(500).json({ error: "Error al buscar reseñas" });
    }
    return response.status(200).json({ resenas: resenas });
  });
};

//---------------------------------------------------------------Enviar Correos -----------------------------

exports.enviar_resenia = async (request, response, next) => {
  const marca = request.params.marca;
  const csrfToken = request.csrfToken();
  console.log(csrfToken);

  try {
    const total = await Correos.emailpreguntas(marca); // Espera a que se resuelva la promesa

    const { preguntas, idp } = await Correos.emailConfiguration(marca);

    const tipos = [];
    const opciones = [];
    const total_opciones = [];
    for (let i = 0; i < total; i++) {
      const tipo = await Correos.emailtipo_pre(idp[i].idPregunta);
      const opcion = await Correos.emailopciones(idp[i].idPregunta);
      const to_opcion = await Correos.emailcountopcion(idp[i].idPregunta);
      tipos.push(tipo);
      opciones.push(opcion);
      total_opciones.push(to_opcion);
    }

    let html = ``;

    html += `


        <body>
        <div class="preview-html">
            <div class="contenido">
                <form action="http://localhost:3000/users/login" method="POST">
                <input type="hidden" name="_csrf" value="${csrfToken}" />

                <img src="cid:unique@nodemailer.com" height="200" width="100%">
                <h4><b>Hola user,</b></h4>
                <p id="sub_question">Has comprado recientemente 'producto' <br> ¿Nos cuentas tu experiencia?</p>
                <div class="rating-box">
                    <h5 id="question_text"><b>¿Cuál es su calificación general?</b></h5>
                    <div class="rating">
                      <input type="radio" name"clr1">
                      <input type="radio" name"clr1">
                      <input type="radio" name"clr1">
                      <input type="radio" name"clr1">
                      <input type="radio" name"clr1">
                    </div>
                </div>
                <h4><b>Título de tu reseña: </b></h4>
                <input type="text" id="title_rev" name="titulo_review" placeholder="Título"><br>
                <h4><b>Reseña: </b></h4>
                <textarea name="descripcion_review" id="description_rev" cols="35" rows="4" placeholder="Escribe aquí tu reseña"></textarea>
                <div id="survey-form">
        `;
    for (var i = 0; i < preguntas.length; i++) {
      html += `
            <br>
            <h4><b>${preguntas[i].descripcion}</b></h4>
            `;
      if (tipos[i][0].tipo == 1) {
        html += `
                <p id="sub_question">Elige una de las siguientes opciones</p>
                                
                <select name="answer-${preguntas[i].idPregunta}">`;

        opciones[i].forEach((opcion) => {
          html += `<input type="radio" name="gender" value="${opcion.idOpcion}" checked> ${opcion.descripcion}<br>`;
        });
        html += `</select>
                `;
      } else if (tipos[i][0].tipo == 2) {
        opciones[i].forEach((opcion) => {
          html += `
                    <textarea name="answer-${preguntas[i].idPregunta}" id="option-${opcion.idOpcion}" cols="35" rows="3" placeholder="${opcion.descripcion}"></textarea>
                    <br>
                    `;
        });
      } else if (tipos[i][0].tipo == 3) {
        html += `
                <p id="sub_question">Elige una o varias de las siguientes opciones</p>
                `;
        opciones[i].forEach((opcion) => {
          html += `
                    <input type="checkbox" id="option-${opcion.idOpcion}" name="answer-${preguntas[i].idPregunta}" value="${opcion.idOpcion}">
                    <label for="option-${opcion.idOpcion}">${opcion.descripcion}</label><br>
                    `;
        });
      }
    }

    html += `
                </div>
                
                <div class="submit-button-container">
                    <button type="submit" class="submit-button">¡Envía tu reseña!</button>
                </div>
            </form>

            </div>
        </div>

      <link rel="stylesheet" href="/css/style.css" />
      <link rel="stylesheet" href="/css/correos.css" />


        <style>
        @import ("https://fonts.googleapis.com/css?family=Roboto|Varela+Round")
        @import ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css")
        @import ("https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css")

        .rating:not(:checked) > input {
          position: absolute;
          appearance: none;
        }
        
        .rating:not(:checked) > label {
          float: right;
          cursor: pointer;
          font-size: 30px;
          color: #666;
          
        }
        
        .rating:not(:checked) > label:before {
          content: '★';
        }
        
        .rating > input:checked + label:hover,
        .rating > input:checked + label:hover ~ label,
        .rating > input:checked ~ label:hover,
        .rating > input:checked ~ label:hover ~ label,
        .rating > label:hover ~ input:checked ~ label {
          color: #fdd300;
        }
        
        .rating:not(:checked) > label:hover,
        .rating:not(:checked) > label:hover ~ label {
          color: #fdca00;
        }
        
        .rating > input:checked ~ label {
          color: #fdd300;
          
        }
        
        .rating-box .rating {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
          flex-direction: row-reverse;
        }
        </style>

        <div>
          <p> algo </p>
        </div>

        </body>`;

    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "tracpablo@gmail.com",
        pass: "gjlu ultc ppfm srbq",
      },
    });

    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Forgot password" <tracpablo@gmail.com>', // sender address
        to: "a01710778@tec.mx", // list of receivers
        subject: "Intento1", // Subject line
        html: html,
        attachments: [
          {
            filename: "image.png",
            path: `./public/images/${marca}.png`,
            cid: "unique@nodemailer.com", //same cid value as in the html img src
          },
        ],
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);

    // Ahora renderiza con los datos obtenidos
    response.render("prueba_correo", {
      preguntas: preguntas,
      titulo: "Correos",
      marca: marca || "LU1",
      ruta: "/reviews/resenas/enviar_resenia/LU1",
      idp: idp,
      total: total,
      tipos: tipos,
      opciones: opciones,
      idp: idp,
      total_opciones: total_opciones,
      permisos: request.session.permisos || [],
    });
  } catch (error) {
    console.error("Error al cargar las preguntas:", error);
    response.status(500).send("Error interno del servidor");
  }
};
