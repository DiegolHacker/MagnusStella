const express = require("express");
const router = express.Router();
const controladores = require("../controllers/renderHtml");

router.get("/", controladores.get_dashboard);

router.get("/login", controladores.get_login)


module.exports = router;