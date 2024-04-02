module.exports = (request, response, next) => {

    let can_edit = false;
    for (let permiso of request.session.permisos) {
        if(permiso.funcion == "editar") {
            can_edit = true;
        }
    }

    if (can_edit) {
        next();
    } else {
        return response.redirect('/logout');
    }
    
}