const express = require('express');
const router = express.Router();

const apiController = require('../../controllers/api/productsApiController')


router.get('/', apiController.all)



module.exports = router;