const express = require("express");
const db = require('./util/database');  
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const session = require('express-session');

app.use(function(req, res, next) {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});


app.use(session({
    secret: 'mi string',
    resave: false,
    saveUninitialized: false,
}));

const path = require("path");
app.use(express.static(path.join(__dirname, "/public")));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));



//PROTECCION CONTRA CROSS-SITE REQUEST FORGERY
// const csrf = require('csurf');
// const csrfProtection = csrf();
// app.use(csrfProtection); 


//FIN CSRF

const routasAplicacionResenas = require("./routes/routes1.routes"); // Cambiar el nombre de el archivo de rutas a algo más substancial
const routasLogin = require('./routes/login.routes');
const routasReview = require('./routes/resenas.routes');
const routasGraphics = require('./routes/grafica.routes');

// Define las rutas más específicas primero
app.use('/users', routasLogin);
app.use('/reviews', routasReview);
app.use('/graphics', routasGraphics);
app.use("/", routasAplicacionResenas);

app.use((request,response,next) => {
    response.status(404);
    const marca = request.params.marca;
    response.render("404", {titulo: 'Error 404', modo: request.getMode, marca:marca, ruta: "/graphics/dashboard" })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`)
});
