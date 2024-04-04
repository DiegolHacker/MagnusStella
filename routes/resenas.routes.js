const express = require("express");
const router = express.Router();
const controladores = require("../controllers/resenas.controller");

// Asigna controladores específicos a cada ruta
router.get('/resenas_completas/:marca/:id', controladores.get_resenas_completas);
router.get('/resenas/:marca', controladores.get_resenas);

module.exports = router;
