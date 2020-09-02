const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const products = require('../controllers/productsController');

router.get('/productDetail', productsController.productDetail)
router.get('/productCart', productsController.productCart)
router.get('/productAdd', productsController.productAdd)
router.get('/productAdm', productsController.productAdm)
router.get('/productShow', productsController.productShow)
router.get('/productAddProfile',productsController.productAddProfile)

module.exports = router