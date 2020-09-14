const express = require('express');
const router = express.Router();

const cookieCheck = require("../middlewares/cookieCheck")

const indexController = require('../controllers/indexController')

router.get('/',cookieCheck, indexController.index)

module.exports = router;