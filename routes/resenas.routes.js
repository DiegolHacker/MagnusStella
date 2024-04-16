const express = require("express");
const router = express.Router();
const controladores = require("../controllers/resenas.controller");

// Asigna controladores específicos a cada ruta
router.get('/resenas_completas/:marca/:id', controladores.get_resenas_completas);
router.get('/resenas/:marca/buscar/:valor_busqueda', controladores.get_buscar);
router.get('/resenas/:marca', controladores.get_resenas);
// router.get("/correos/:marca", controladores.get_correos);


module.exports = router;
