const Usuarios = require("../models/usuarios.model");
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render("login")
};

exports.post_login = (request, response, next) => {
    const {email, password} = request.body;
    console.log(request.body);
    if(!email || !password){
        return response.render("login", {error: "Llena todos los campos"})
    }

    Usuarios.findByEmail(email,password)
        .then(({user,passwordMatch}) => {
            if(user && passwordMatch){
                request.session.isLoggedIn = true;
                request.session.user = user;
                return request.session.save(err => {
                    response.redirect('/');
                });
            }else{
                response.redirect('/login');
            }
        })
        .catch(err => {
            console.error('Error durante el login',err);
            response.redirect('/users/login')
        })

    // Usuarios.findByEmail(email)
    //     .then(({ user, passwordMatch }) => {
    //         if (user && passwordMatch) {
    //             // Use bcrypt.compare to check if passwords match
    //             bcrypt.compare(password, user.Contrasena)
    //                 .then(doMatch => {
    //                     if (doMatch) {
    //                         request.session.isLoggedIn = true;
    //                         request.session.user = user;
    //                         return request.session.save(err => {
    //                             response.redirect('/');
    //                         });
    //                     } else {
    //                         response.redirect('/login');
    //                     }
    //                 })
    //                 .catch(err => {
    //                     console.error('Error during login', err);
    //                     response.redirect('/login');
    //                 });
    //         } else {
    //             response.redirect('/login');
    //         }
    //     })
    //     .catch(err => {
    //         console.error('Error during login', err);
    //         response.redirect('/login');
    //     });

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
    response.render("signup")
};

let latestID = 6; //en este caso empiezo en 1 ya que ya se creo el primer usuario

exports.post_signup = (request,response,next) => {
    const {name, email, password} = request.body;
    console.log(request.body);
    
    if(!name || !password || !email){
        return response.render("signup", {error: "Llena todos los campos"})
    }

    const idUser = generateUserID();

    const IdRol = Math.floor(Math.random() * 11);

    const usuarios = new Usuarios(name,email,password,idUser,IdRol);
    usuarios.save()
        .then(() =>{
            response.redirect('/users/login')
        })
        .catch(err => {
            console.log("Error al hacer el signup:",err);
            response.redirect('/signup')
        });
}

const generateUserID = () => {
    latestID++;

    const UserID = 'U' + String(latestID).padStart(6,'0');
    return UserID;
}

