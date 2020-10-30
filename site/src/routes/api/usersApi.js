const express = require('express');
const router = express.Router();

const apiController = require('../../controllers/api/usersApiController')


router.get('/', apiController.all)



module.exports = router;