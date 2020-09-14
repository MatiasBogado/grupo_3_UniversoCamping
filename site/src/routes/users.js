const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const loginValidator = require('../validators/loginValidator');
const registerValidator = require('../validators/registerValidator')
const multerAvatar = require('../middlewares/multerAvatar');

const productsController = require('../controllers/productsController')

const sessionUserCheck = require("../middlewares/sessionUserCheck")

const multerProduct = require("../middlewares/multerProduct")



router.get('/register', usersController.register)
router.post('/register',multerAvatar.any(),registerValidator, usersController.procesoRegister)

router.get('/login', usersController.login)
router.post('/login',loginValidator, usersController.procesoLogin)

router.get('/profile', usersController.profile);
router.post('/profile',multerProduct.any(),sessionUserCheck,productsController.agregar)

router.get('/logout',usersController.logout);

module.exports = router