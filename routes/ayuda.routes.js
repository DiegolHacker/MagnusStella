const express = require("express");
const router = express.Router();
const csrf = require('csurf');
// const csrfProtection = csrf();
const controladores = require("../controllers/ayuda.controller");

// router.use(csrfProtection)

router.get("/:marca", controladores.get_ayuda);

module.exports = router;