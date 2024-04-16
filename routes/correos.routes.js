const express = require("express");
const router = express.Router();
const controladores = require("../controllers/correos.controller");
const isAuth = require("../util/is-auth");
const canEdit = require("../util/can-edit");

router.get("/correos/:marca/editar/:pregunta_id", isAuth, canEdit, controladores.get_correos_editar);
router.get("/correos/:marca", isAuth, canEdit, controladores.get_correos);
module.exports = router;