const Usuarios = require("../models/usuarios.model");
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render("login")
};

exports.post_login = (request, response, next) => {
    const email = request.body.name;
    const password = request.body.password;
    if(!email || !password){
        return response.render("login", {error: "Llena todos los campos"});
    }
// console.log(email,password)
    Usuarios.findByEmail(email)
        .then(user => {
            if (user) {
                // console.log(password)
                // console.log(user.user.contrasena)
                console.log(user)
                bcrypt.compare(password, user.user.contrasena)
                    .then(doMatch => {
                        if (doMatch) {
                            request.session.isLoggedIn = true;
                            request.session.user = user;
                            return request.session.save(err => {
                                response.redirect('/');
                            });
                        } else {
                            response.redirect('/users/login');
                        }
                    })
                    .catch(err => {
                        console.error('Error during login despues de bycompare', err);
                        response.render("login",{error: "Usuario no existe"});
                    });
            } else {
                response.redirect('/users/login');
            }
        })
        .catch(err => {
            console.error('Error during login', err);
            response.redirect('/users/login');
        });

};

//contra Hola123
//pruebaauth02@gmail.com

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login');
    });
};

/////// Sign up ////////

exports.get_signup =(request, response, next) => {
    const marca = request.params.marca
    response.render("signup", {titulo: 'Anadir Usuarios',marca:marca || "LU1", ruta: 'users/signup'})
};


let latestID = 9;
exports.post_signup = (request,response,next) => {
    console.log(request.body)
    const marca = request.params.marca
    const {name, email, password} = request.body;
    const IdRol = request.body.rol;
    
    if(!name || !password || !email){
        return response.render("signup",{titulo:"Signup",error: "Llena todos los campos", marca: marca,ruta:"/usuarios/LU1/1"})
    }

    const idUser = generateUserID();

    console.log(IdRol)
    const usuarios = new Usuarios(name,email,password,idUser,IdRol);
    // console.log(usuarios)
    usuarios.save()
        .then(() =>{
            response.redirect('/usuarios/LU1/1')
        })
        .catch(err => {
            console.log("Error al hacer el signup:",err);
            response.redirect('/usuarios/LU1/1')
        });
}

const generateUserID = () => {
    latestID++;

    const UserID = 'U' + String(latestID).padStart(6,'0');
    return UserID;
}

