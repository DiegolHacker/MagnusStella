const express = require("express");
const router = express.Router();
const controladores = require("../controllers/usuarios.controller");

router.get("/login", controladores.get_login);
router.post("/login", controladores.post_login);
router.get("/logout", controladores.get_logout);

router.get("/signup",controladores.get_signup);
router.post("/signup",controladores.post_signup)

module.exports = router;
