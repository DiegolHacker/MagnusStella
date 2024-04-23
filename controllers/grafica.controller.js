const Model = require('../models/grafica.model'); // Reemplaza './model' con la ruta correcta a tu modelo

exports.get_dashboard = async (request, response, next) => {

    const marca = request.params.marca
    let categoria = request.params.categoria || '*';
    let producto = request.body.producto || '*'; //"AN1133V"
    let startDate = request.body.startDate || '*';
    let endDate = request.body.endDate || '*';
    //metodo post va a llamar esta funcion, checar igual que se haya mandado la fecha, si no se mando nada, meter una fecha default que sea el ano actual, o el Quarter actual
    
    let errorMessage = '';

    if(producto !== "*") {

        try {
            const result = await Model.search(producto);
                
            if(result.error !== undefined) {
                errorMessage = result.error;
                producto = "*";
            
            } else {
                errorMessage = result.error;
            }
                
        } catch(error) {
            console.log(error)
        }
            
    }
    
    Promise.all([Model.StarAvgLine(marca,categoria), Model.tasaDeRespuesta(marca,categoria,producto),Model.ReviewsSentxMonth(marca,categoria,producto),Model.StarAvgNumber(marca,categoria,producto)])
        .then(([averageScores, responseRates,reviewsSent,starAVGNum]) => {
            const roundedStarAVGNum = Math.round(starAVGNum * 100) / 100
            const roundedStarAVGNumComplementario = Math.round(100 - ((roundedStarAVGNum / 5) * 100));
            response.render("dashboard", {
                titulo: 'Dashboard',
                promedioPuntajes: averageScores,
                tasaDeRespuesta: responseRates,
                encuestasEnviadas: reviewsSent,
                numAVGEstrella: roundedStarAVGNum,
                porcentaje: roundedStarAVGNumComplementario,
                marca: marca,
                categoria: categoria,
                ruta: "/graphics/dashboard",
                errorProducto: errorMessage,
                permisos: request.session.permisos || [],
                csrfToken: request.csrfToken(),
            });
        })
        .catch(error => {
            console.error('Error obteniendo datos para el dashboard:', error);
            next(error); // Pasa el error al siguiente middleware para manejarlo
        });

};

exports.post_buscar = (request,response,next) => {
    Model.search(request.params.valor_busqueda)
        .then(([busqueda,fieldData]) => {
            return response.status(200).json({busqueda: busqueda});
        })
        .catch((error) => {console.log(error)});
};
