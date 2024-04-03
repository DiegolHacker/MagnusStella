const express = require("express");
const router = express.Router();
const isAuth = 0//require('');
const Zecore = 0//require('');
const apicontrollers = require("../controllers/api.controller");

router.get('/api/salesdata', apicontrollers.get_salesdata);
router.post('/api/salesdata', apicontrollers.get_salesdata);

module.exports = router;