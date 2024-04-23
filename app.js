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

app.use(bodyParser.json());



const multer = require('multer');
//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
  destination: (request, file, callback) => {
      //'public/uploads': Es el directorio del servidor donde se subirán los archivos 
      callback(null, 'public/uploads');
  },
  filename: (request, file, callback) => {
      //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
      //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
      callback(null, file.originalname);
  },
});
app.use(multer({ storage: fileStorage }).single('image'));

//---------------------------------------------------Nodemailer--------------------------------------------------


// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: "tracpablo@gmail.com",
//     pass: "gjlu ultc ppfm srbq",
//   },
// });

// transporter.verify().then(() => {
//     console.log("Ready to send emails");
// })

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Forgot password" <tracpablo@gmail.com>', // sender address
//     to: "a01710778@tec.mx", // list of receivers
//     subject: "Forgot password", // Subject line
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);

//---------------------------------------------------Fin Nodemailer--------------------------------------------------






const routesZecore = require('./routes/zecore.routes')

// Define las rutas más específicas primero
app.use('/api', routesZecore);

//PROTECCION CONTRA CROSS-SITE REQUEST FORGERY
const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 



//FIN CSRF

const routasAplicacionResenas = require("./routes/routes1.routes"); // Cambiar el nombre de el archivo de rutas a algo más substancial
const routasLogin = require('./routes/login.routes');
const routasReview = require('./routes/resenas.routes');
const routasCorreos = require('./routes/correos.routes');
const routasGraphics = require('./routes/grafica.routes');
const routasAyuda = require('./routes/ayuda.routes');
const { read } = require("fs");



app.use('/users', routasLogin);
app.use('/reviews', routasReview);
app.use('/emails', routasCorreos);
app.use('/graphics', routasGraphics);
app.use('/ayuda', routasAyuda);
app.use("/", routasAplicacionResenas);

app.use((request,response,next) => {
    response.status(404);
    const marca = request.params.marca;
    response.render("404", {titulo: 'Error 404', modo: request.getMode, marca:marca || "LU1", ruta: "/graphics/dashboard", permisos: request.session.permisos || [] })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`)
});
