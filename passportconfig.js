const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const user = require('./models/usuarios.model');

passport.use(new GoogleStrategy({
    clientID: '724591537198-dfqbhcjreqpglcies95r7p45q80gd3f4.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;  // Email proporcionado por Google

    user.findByEmail(email)
      .then(user => {
        if (user) {
          return done(null, user);  // Usuario encontrado, continuar autenticación
        } else {
          return done(null, false, { message: 'Este correo no está registrado' });  // Usuario no registrado
        }
      })
      .catch(error => {
        return done(error);  // Manejo de errores
      });
  }
));

passport.serializeUser((user, done) => {
    return done(null, user.CorreoEmpleado);  // Asegúrate de que 'id' es la columna correcta en tu base de datos
});

passport.deserializeUser((correoEmpleado, done) => {
    user.findByEmail(correoEmpleado)
        .then(user => {
            if (user) {
                return done(null, user);  // Usuario encontrado
            } else {
                return done(null, false);  // Usuario no encontrado
            }
        })
        .catch(error => {
            return done(error, null);  // Error en la búsqueda
        });
});