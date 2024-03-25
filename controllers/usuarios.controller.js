const Usuarios = require("../models/usuarios.model");
const bycrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render("login")
};

exports.post_login = (request, response, next) => {
    const {email, password} = request.body;
    console.log(request.body);
    if(!email || !password || !email){
        return response.render("login", {error: "Llena todos los campos"})
    }
    // const usuarios = new Usuarios(request.body.name, request.body.password);
    // usuarios.save();
    request.session.username = request.body.username;
    response.redirect('/');
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login');
    });
};

/////// Sign up ////////

exports.get_signup =(request, response, next) => {
    response.render("signup")
};

let latestID = 1; //en este caso empiezo en 1 ya que ya se creo el primer usuario

exports.post_signup = (request,response,next) => {
    const {name, email, password} = request.body;
    console.log(request.body);
    
    if(!name || !password || !email){
        return response.render("signup", {error: "Llena todos los campos"})
    }

    const idUser = generateUserID();

    const IdRol = Math.floor(Math.random() * 11);

    const usuarios = new Usuarios(name,email,password,idUser,IdRol);
    usuarios.save();
    response.redirect('/users/login');
}

const generateUserID = () => {
    latestID++;

    const UserID = 'U' + String(latestID).padStart(6,'0');
    return UserID;
}