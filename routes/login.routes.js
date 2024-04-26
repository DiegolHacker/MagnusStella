const express = require("express");
const router = express.Router();
const controladores = require("../controllers/usuarios.controller");
const passport = require('passport');
const Usuarios = require('../models/usuarios.model');

router.get("/login", controladores.get_login);
router.post("/login", controladores.post_login);
router.get("/logout", controladores.get_logout);
router.get("/signup/:marca", controladores.get_signup);
router.post("/signup", controladores.post_signup);

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/login' }), async (req, res) => {
  try {
    const { id, displayName, emails } = req.user;
    const email = emails[0].value;

    // Find the user by email
    const { user, passwordMatch } = await Usuarios.findByEmail(email);

    console.log(user)

    if (user) {
      // User found, set session and redirect
      req.session.isLoggedIn = true;
      req.session.permisos = user.permisos;
      req.session.user = user;
      return req.session.save(err => {
        if(err){
          response.redirect('/users/login');
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