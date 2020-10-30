const express = require('express');
const router = express.Router();

const apiController = require('../../controllers/api/categoriesApiController')


router.get('/', apiController.all)



module.exports = router;