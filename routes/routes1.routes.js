const express = require("express");
const router = express.Router();
const controladores = require("../controllers/renderHtml");
const isAuth = require("../util/is-auth");
const canAdmin = require("../util/can-admin");

router.get('/usuarios/editar/:usuario_id', isAuth, canAdmin, controladores.get_editar)
router.post('/usuarios/editar/', isAuth, canAdmin, controladores.post_editar)
router.get('/usuarios/:marca/:pag', isAuth, canAdmin, controladores.get_usuarios);
router.get("/", (request,response,next) => {
    response.redirect("/graphics/dashboard/LU1");
})

module.exports = router;