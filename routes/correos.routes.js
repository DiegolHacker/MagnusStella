const express = require("express");
const router = express.Router();
const controladores = require("../controllers/correos.controller");

router.get("/correos/:marca/editar/:pregunta_id", controladores.get_correos_editar);
router.get("/correos/:marca", controladores.get_correos);
module.exports = router;