const express = require("express");
const router = express.Router();
const controladores = require("../controllers/grafica.controller");

router.get("/dashboard", controladores.get_dashboard);
router.post("/dashboard", controladores.postMarca);
router.get("/analitica", controladores.get_analitica)

module.exports = router;