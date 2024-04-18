const express = require("express");
const router = express.Router();
const controladores = require("../controllers/renderHtml");

router.get('/usuarios/editar/:usuario_id/:marca', controladores.get_editar);
router.post('/usuarios/editar/:usuario_id', controladores.post_editar);
router.get('/usuarios/:pag/:marca', controladores.get_usuarios);
router.post('/usuarios/delete', controladores.post_delete);
router.get("/", (request,response,next) => {
    response.redirect("/graphics/dashboard/LU1");
})

module.exports = router;