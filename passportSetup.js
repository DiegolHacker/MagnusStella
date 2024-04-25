const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('./models/usuarios.model');

passport.use(
  new GoogleStrategy(
    {
      clientID: '510682302712-bvc0hgpv3knm4sglnnrkma4hn3rhmqpn.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/usuarios/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { emails } = profile;
        const email = emails[0].value;

        const { user, passwordMatch } = await userModel.findByEmail(email);
        if (user) {
          return done(null, user);
        } else {
          // User not found, return false to deny authentication
          return done(null, false);
        }
      } catch (err) {
        console.error('Error in google strategy callback: ', err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.idUsuario);
});

passport.deserializeUser(async (idUsuario, done) => {
  try {
    const user = await userModel.fetchOne(idUsuario);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});