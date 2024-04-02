const express = require("express");
const db = require('./util/database');  
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const session = require('express-session');

app.use(session({
    secret: 'mi string',
    resave: false,
    saveUninitialized: false,
}));

const path = require("path");
app.use(express.static(path.join(__dirname, "/public")));

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));

const routasAplicacionResenas = require("./routes/routes1.routes"); //cambiar el nombre de el archivo de rutas a algo mas substancial
const routasLogin = require('./routes/login.routes');

app.use('/users',routasLogin);
app.use("/", routasAplicacionResenas);

app.use((request,response,next) => {
    response.status(404);
    response.render("404", {titulo: 'Error 404'})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`)
});