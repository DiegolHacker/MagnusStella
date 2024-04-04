const Model = require('../models/grafica.model'); // Reemplaza './model' con la ruta correcta a tu modelo

exports.get_dashboard = (request, response, next) => {
    const marca = request.params.marca
    console.log(marca)
    Promise.all([Model.StarAvg(marca), Model.tasaDeRespuesta(),Model.ReviewsSentxMonth()])
        .then(([averageScores, responseRates,reviewsSent]) => {
            // console.log(averageScores);
            // console.log(responseRates) 
            // console.log(reviewsSent)

            response.render("dashboard", {
                titulo: 'Dashboard',
                promedioPuntajes: averageScores,
                tasaDeRespuesta: responseRates,
                encuestasEnviadas: reviewsSent,
                marca: marca,
            });
        })
        .catch(error => {
            console.error('Error obteniendo datos para el dashboard:', error);
            next(error); // Pasa el error al siguiente middleware para manejarlo
        });
};


exports.get_analitica = (request, response, next) => {
    const marca = request.params.marca;
    response.render("analitica", {
        titulo: 'Analitica',
        marca:marca
        // csrfToken: request.csrfToken()
    })
}