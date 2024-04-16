const express = require("express");
const router = express.Router();
const controladores = require("../controllers/correos.controller");

router.get("/correos/editar/:marca/:pregunta_id", controladores.get_correos_editar);
router.post('/correos/editar/', controladores.post_editar_correos);
router.get("/correos/:marca", controladores.get_correos);
module.exports = router;