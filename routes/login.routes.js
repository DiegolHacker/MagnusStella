const express = require("express");
const router = express.Router();
const controladores = require("../controllers/usuarios.controller");
const passport = require('passport');
const Usuarios = require('../models/usuarios.model');
const isAuth = require("../util/is-auth");
const canAdmin = require("../util/can-admin");

router.get("/login", controladores.get_login);
router.post("/login", controladores.post_login);
router.get("/logout", controladores.get_logout);
router.get("/signup/:marca", isAuth, canAdmin, controladores.get_signup);
router.post("/signup", isAuth, canAdmin, controladores.post_signup);

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/login' }), async (req, res) => {
  try {
    const email = req.user.email;

    // Find the user by email
    const { user, passwordMatch } = await Usuarios.findByEmail(email);
    const arrayPermisos = await Usuarios.getPermisos(email);

    const permisos = arrayPermisos[0];

    console.log(permisos)

    if (user) {
      // User found, set session and redirect
      req.session.isLoggedIn = true;
      req.session.permisos = permisos;
      req.session.user = user;
      return req.session.save(err => {
        if(err){
          res.redirect('/users/login');
        }
        res.redirect('/');
      });
    } else {
      // User not found, display an error message or redirect to registration page
      req.session.error = 'User not registered. Please contact the admin.';
      console.log(req.session.error);
      res.redirect('/users/login');
    }
  } catch (error) {
    console.error('Error during Google OAuth callback:', error);
    res.redirect('/users/login');
  }
});

module.exports = router;