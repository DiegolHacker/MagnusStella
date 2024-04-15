const express = require("express");
const router = express.Router();
const csrf = require('csurf');
// const csrfProtection = csrf();
const controladores = require("../controllers/grafica.controller");

// router.use(csrfProtection)

router.get("/dashboard/:marca", controladores.get_dashboard);
router.get("/dashboard/:marca/:categoria", controladores.get_dashboard);
router.get("/analitica/:marca", controladores.get_analitica)
router.get('/dashboard/:marca/:valor_busqueda', controladores.get_buscar);

module.exports = router;