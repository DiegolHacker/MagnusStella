const express = require("express");
const router = express.Router();
const controladores = require("../controllers/renderHtml");

router.get("/", isAuth, canView,controladores.get_dashboard);
router.get('/usuarios', isAuth, canAdmin, controladores.get_usuarios);
router.get('/resenas', isAuth, canView, controladores.get_resenas);
router.get('/resenas_completas', isAuth, canView, controladores.get_resenas_completas);
router.get("/login", controladores.get_login);
router.get("/correos", isAuth, canEdit, controladores.get_correos);
router.get("/analitica", isAuth, canView, controladores.get_analitica)

module.exports = router;