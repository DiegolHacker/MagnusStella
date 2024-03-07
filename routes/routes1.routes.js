const express = require("express");
const router = express.Router();
const controladores = require("../controllers/renderHtml");

router.get("/", controladores.get_dashboard);
router.get('/usuarios', zebrandsController.get_usuarios);

module.exports = router;