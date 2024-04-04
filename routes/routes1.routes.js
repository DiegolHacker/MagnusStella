const express = require("express");
const router = express.Router();
const controladores = require("../controllers/renderHtml");


router.get('/usuarios', controladores.get_usuarios);
router.get("/correos", controladores.get_correos);
router.get("/", (request,response,next) => {
    response.redirect("/graphics/dashboard/LU1");
})

module.exports = router;