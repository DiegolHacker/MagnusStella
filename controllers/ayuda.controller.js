const Model = require('../models/ayuda.model');

exports.get_ayuda = (request, response, next) => {
    const marca = request.params.marca;
    response.render("ayuda", {
        titulo: 'Ayuda',
        marca: marca
        // csrfToken: request.csrfToken()
    });
}
