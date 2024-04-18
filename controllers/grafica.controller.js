const Model = require('../models/grafica.model'); // Reemplaza './model' con la ruta correcta a tu modelo

exports.get_dashboard = async (request, response, next) => {

    const marca = request.params.marca
    let categoria = request.params.categoria || '*';
    let producto = request.body.producto || '*'; //"AN1133V"
    let errorMessage = '';

    if(producto !== "*"){
        Model.search(producto)
            .then(result => {
                if(result.error !== undefined) {
                    console.log(result.error);
                    const errorMessage = result.error;
                    producto = "*";
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
                                ruta: "/graphics/dashboard",
                                errorProducto : errorMessage,
                                permisos: request.session.permisos || [],
                                csrfToken: request.csrfToken(),
                            });
                            })
                            .catch(error => {
                                console.error('Error obteniendo datos para el dashboard:', error);
                                next(error); // Pasa el error al siguiente middleware para manejarlo
                            });
                }else{
                    const errorMessage = result.error;
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
                                marca: marca || "LU1",
                                ruta: "/graphics/dashboard",
                                errorProducto : errorMessage,
                                permisos: request.session.permisos || [],
                                csrfToken: request.csrfToken(),
                            });
                        })
                        .catch(error => {
                            console.error('Error obteniendo datos para el dashboard:', error);
                            next(error); // Pasa el error al siguiente middleware para manejarlo
                        });
                }
            })
            .catch(error => {
                console.log(error)
            })
    }else{
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
                    ruta: "/graphics/dashboard",
                    errorProducto: undefined,
                    permisos: request.session.permisos || [],
                    csrfToken: request.csrfToken(),

                });
            })
            .catch(error => {
                console.error('Error obteniendo datos para el dashboard:', error);
                next(error); // Pasa el error al siguiente middleware para manejarlo
            });
    };

        

};

exports.post_buscar = (request,response,next) => {
    Model.search(request.params.valor_busqueda)
        .then(([busqueda,fieldData]) => {
            return response.status(200).json({busqueda: busqueda});
        })
        .catch((error) => {console.log(error)});
};
