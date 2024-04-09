const express = require("express");
const router = express.Router();
const controladores = require("../controllers/renderHtml");

router.get('/usuarios/editar/:usuario_id', controladores.get_editar)
router.post('/usuarios/editar/', controladores.post_editar)
router.get('/usuarios/:marca/:pag', controladores.get_usuarios);
router.get("/correos/:marca", controladores.get_correos);
router.get("/", (request,response,next) => {
    response.redirect("/graphics/dashboard/LU1");
})

module.exports = router;