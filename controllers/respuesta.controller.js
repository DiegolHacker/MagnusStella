const respuestaM = require("../models/respuesta.model");

exports.post_MailResponse = (request, response, next) => {
  const resp = request.body;
  const respuesta = new respuestaM({
    nombre: resp.nombre,
    email: resp.email,
    mensaje: resp.mensaje,
  });

  console.log(request.body);
  respuesta
    .save()
    .then(() => {
      return response
        .status(200)
        .json({ message: "Se ha registrado la respuesta" });
    })
    .catch((error) => {
      console.log("Error al recibir respuesta: " + error);
      return response
        .status(500)
        .json({ message: "Error al recibir información: " + error });
    });
};
