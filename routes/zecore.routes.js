const express = require('express');
const router = express.Router();

const zecoreC = require('../controllers/zecore.controller')




router.post('/api/zecore/venta',zecoreC.post_venta)


module.exports = router