exports.get_dashboard = (request, response,next) => {
    response.render("dashboard", {
        titulo: 'Dashboard',
    })
};

exports.get_login = (request, response,next) =>{
    response.render("login")
}