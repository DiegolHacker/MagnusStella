module.exports = (request, response, next) => {

    let can_view = false;
    for (let permiso of request.session.permisos) {
        if(permiso.funcion == "ver") {
            can_view = true;
        }
    }

    if (can_view) {
        next();
    } else {
        return response.redirect("/users/logout");
    }
    
}