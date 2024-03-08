const express = require("express");
const router = express.Router();
const controladores = require("../controllers/renderHtml");

router.get("/", controladores.get_dashboard);
router.get('/usuarios', controladores.get_usuarios);
router.get('/resenas', controladores.get_resenas);
router.get('/resenas_completas', controladores.get_resenas_completas);
router.get("/login", controladores.get_login);
router.get("/correos", controladores.get_correos);
router.get("/analitica", controladores.get_analitica)

module.exports = router;