const express = require('express');
const router = express.Router();

const productDetail = require('../controllers/productDetailController')

router.get('/', productDetail.index)

module.exports = router