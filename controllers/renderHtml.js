exports.get_dashboard = (request, response,next) => {
    response.render("dashboard", {
        titulo: 'Dashboard',
    })
};

exports.post_marca = (request, response, next) => {
    request.session.marca = "caca";
}

exports.get_usuarios = (request, response, next) => {
    const usuarios = [
        { id: 1, nombre: "Angélica Ríos Cuentas", correo: "A01705651@tec.mx", rol: "Admin", estado: "Activo" },
        { id: 2, nombre: "Diego Fuentes Juvera", correo: "A01705506@tec.mx", rol: "CRM", estado: "Activo" },
        { id: 3, nombre: "Juan Pablo Chávez", correo: "A01705408@tec.mx", rol: "CRM", estado: "Inactivo" },
        { id: 4, nombre: "Diego Ricardo Alfaro", correo: "A01709971@tec.mx", rol: "Analítica", estado: "Activo" },
        { id: 5, nombre: "Pablo Hazael Hurtado", correo: "A01710778@tec.mx", rol: "Analítica", estado: "Inactivo" }
    ];
    response.render('usuarios', { usuarios: usuarios, titulo:"Usuarios" });
};



exports.get_login = (request, response, next) => {
    response.render("login", {
        username: request.session.username || '',
        csrfToken: request.csrfToken()})
}


exports.get_correos = (request, response, next) => {
    response.render("correos", {
        titulo: "Correos",
    })
}

exports.get_analitica = (request, response, next) => {
    response.render("analitica", {
        titulo: 'Analitica',
    })
}