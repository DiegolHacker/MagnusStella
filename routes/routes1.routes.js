const express = require("express");
const router = express.Router();
const controladores = require("../controllers/renderHtml");


router.get('/usuarios/:marca', controladores.get_usuarios);
router.get("/", (request,response,next) => {
    response.redirect("/graphics/dashboard/LU1");
})

module.exports = router;