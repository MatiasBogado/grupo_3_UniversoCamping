const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const loginValidator = require('../validators/loginValidator');
const registerValidator = require('../validators/registerValidator')
const multerAvatar = require('../middlewares/multerAvatar');



router.get('/register', usersController.register)
router.post('/register',multerAvatar.any(),registerValidator, usersController.procesoRegister)

router.get('/login', usersController.login)
router.post('/login',loginValidator, usersController.procesoLogin)

router.get('/profile', usersController.profile);

router.get('/logout',usersController.logout);

module.exports = router