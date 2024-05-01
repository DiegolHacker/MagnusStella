const respuestaM = require("../models/respuesta.model");

// exports.post_MailResponse = (request, response, next) => {
//   console.log(request.body);

//   const resp = request.body;

//   const respuesta = new respuestaM({
//     nombre: resp.nombre,
//     email: resp.email,
//     mensaje: resp.mensaje,
//   });

//   respuesta
//     .save()
//     .then(() => {
//       return response
//         .status(200)
//         .json({ message: "Se ha registrado la respuesta" });
//     })
//     .catch((error) => {
//       console.log("Error al recibir respuesta: " + error);
//       return response
//         .status(500)
//         .json({ message: "Error al recibir información: " + error });
//     });
// };

exports.post_MailResponse = async (request, response, next) => {
  const resp = request.body;
  rating = resp.rate;
  title = resp.titulo_review;
  desc = resp.descripcion_review;
  idventa = 38;//resp.idVenta;
  obj = new respuestaM()
  idrev = await obj.CreateReview(idventa,desc,title,rating);
  console.log('IDREVIEW = '+ idrev)
  for (const clave in resp){
    if (!isNaN(clave)){
      const idPregunta = parseInt(clave)
      obj.AddResponse(idrev, resp[clave], idPregunta);
      console.log(resp[clave])
    }
  }
  console.log('FIN')
  response.redirect("/");
  console.log(request.body);
};
