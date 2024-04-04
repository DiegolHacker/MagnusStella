const express = require("express");
const router = express.Router();
const controladores = require("../controllers/renderHtml");


router.get('/usuarios', controladores.get_usuarios);
router.get("/correos", controladores.get_correos);

module.exports = router;