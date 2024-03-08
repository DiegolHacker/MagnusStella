const express = require("express");
const router = express.Router();
const controladores = require("../controllers/renderHtml");

router.get("/", controladores.get_dashboard);
router.get('/usuarios', controladores.get_usuarios);
router.get('/resenas', controladores.get_resenas);
router.get("/login", controladores.get_login)


module.exports = router;