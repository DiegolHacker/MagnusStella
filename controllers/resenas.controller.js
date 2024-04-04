const Reviews = require("../models/resenas.model"); 


exports.get_resenas_completas = (request, response, next) => {
    const marca = request.params.marca
    console.log(request.params.id);
    const idReview = request.params.id; // Obtiene el ID de la reseña de los parámetros de la solicitud
    // Llama al método fetchCompleto del modelo para obtener los datos de la reseña completa
    Reviews.fetchCompleto(idReview, (err, resenaCompleta) => {
        if (err) {
            return response.status(500).send('Error fetching complete review');
        }

        if (!resenaCompleta) {
            return response.status(404).send('Reseña no encontrada');
        }

        // Renderiza la vista de la reseña completa y pasa los datos de la reseña
        response.render("resenas_completas", { resenas: resenaCompleta, titulo: "Reseña Completa",marca: marca});
    });
};

 
exports.get_resenas = (request, response, next) => {
    const marca = request.params.marca
    Reviews.fetchAll((err, resenasList) => {
        if (err) {
            return response.status(500);
        }

        const resenas = resenasList.map(resena => ({
            id:resena.idReview,
            title: resena.Titulo, 
            resena_descrip: resena.Descripcion,
            estrellas: resena.Puntaje,
            itemcode: resena.idProducto           

        }));
        response.render("resenas", { resenas: resenas, titulo: "Reseñas", marca:marca,});
    });

};
