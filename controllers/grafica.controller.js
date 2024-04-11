const Model = require('../models/grafica.model'); // Reemplaza './model' con la ruta correcta a tu modelo

exports.get_dashboard = (request, response, next) => {
    const marca = request.params.marca
    let categoria = request.params.categoria || '*';
    let producto = '*';//"AN1133V"
    // let producto = request.params.producto || '*'; 
    
    Promise.all([Model.StarAvg(marca,categoria), Model.tasaDeRespuesta(marca,categoria,producto),Model.ReviewsSentxMonth(marca,categoria,producto)])
        .then(([averageScores, responseRates,reviewsSent]) => {
            // console.log(reviewsSent)
            response.render("dashboard", {
                titulo: 'Dashboard',
                promedioPuntajes: averageScores,
                tasaDeRespuesta: responseRates,
                encuestasEnviadas: reviewsSent,
                marca: marca,
                ruta: "/graphics/dashboard"
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
        marca:marca,
        ruta: "/graphics/analitica"
        // csrfToken: request.csrfToken()
    })
}