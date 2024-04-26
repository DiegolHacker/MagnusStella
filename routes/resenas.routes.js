const express = require("express");
const router = express.Router();
const controladores = require("../controllers/resenas.controller");
const isAuth = require("../util/is-auth");
const canView = require("../util/can-view");

// Asigna controladores específicos a cada ruta
router.post('/resenas/visibilidad/:idr', isAuth, canView, controladores.actualizarvisibilidad);
router.get('/resenas_completas/:marca/:id', isAuth, canView, controladores.get_resenas_completas);
router.get('/resenas/:marca/buscar/:valor_busqueda', controladores.get_buscar);
router.get('/resenas/:marca/buscar', controladores.get_buscar);
router.get('/resenas/:marca', isAuth, canView, controladores.get_resenas);
router.get('/resenas/:marca', isAuth, canView, controladores.get_resenas);
// router.get("/correos/:marca", controladores.get_correos);


module.exports = router;
