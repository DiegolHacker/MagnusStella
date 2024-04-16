module.exports = (request, response, next) => {

    let can_admin = false;
    for (let permiso of request.session.permisos) {
        if(permiso.funcion == "administracion") {
            can_admin = true;
        }
    }

    if (can_admin) {
        next();
    } else {
        return response.redirect("/users/logout");
    }
    
}