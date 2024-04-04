const Model = require('../models/grafica.model'); // Reemplaza './model' con la ruta correcta a tu modelo

exports.get_dashboard = (request, response, next) => {
    Promise.all([Model.StarAvg(), Model.tasaDeRespuesta(),Model.ReviewsSentxMonth()])
        .then(([averageScores, responseRates,reviewsSent]) => {
            // console.log(averageScores);
            // console.log(responseRates) 
            // console.log(reviewsSent)

            response.render("dashboard", {
                titulo: 'Dashboard',
                promedioPuntajes: averageScores,
                tasaDeRespuesta: responseRates,
                encuestasEnviadas: reviewsSent,
            });
        })
        .catch(error => {
            console.error('Error obteniendo datos para el dashboard:', error);
            next(error); // Pasa el error al siguiente middleware para manejarlo
        });
};

exports.postMarca = (request,response,next) => {
    const brand = request.body.brand;

    Model.tryBrand(brand)
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.error('Error procesando la marca: ',err);
    });
};

exports.handleAjaxRequest = (request,response,next) => {
    const value = req.body.value;
    console.log(value);
    // Model.pruebaCategoria(value,(err,res) => {
    //     if(err) {
    //         console.error('Error obteniendo el valor ',err);
    //         return;
    //     }
    //     console.log('Valor obtenido correctamente');
    // })
};

exports.get_analitica = (request, response, next) => {
    response.render("analitica", {
        titulo: 'Analitica',
    })
}