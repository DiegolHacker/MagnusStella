const express = require("express");
const router = express.Router();
const csrf = require('csurf');
// const csrfProtection = csrf();
const controladores = require("../controllers/ayuda.controller");

// router.use(csrfProtection)

router.get("/:marca", controladores.get_ayuda);

router.get("/login/:marca", controladores.get_ayuda_login);
router.get("/dashboard/:marca", controladores.get_ayuda_dashboard);
router.get("/resenas/:marca", controladores.get_ayuda_resenas);
router.get("/correos/:marca", controladores.get_ayuda_correos);
router.get("/usuarios/:marca", controladores.get_ayuda_usuarios);
router.get("/general/:marca", controladores.get_ayuda_general);

module.exports = router;