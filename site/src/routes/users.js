const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const loginValidator = require('../validators/loginValidator');
const registerValidator = require('../validators/registerValidator')
const multerAvatar = require('../middlewares/multerAvatar');

const productsController = require('../controllers/productsController')

const sessionUserCheck = require("../middlewares/sessionUserCheck")
const sessionAdminCheck = require("../middlewares/sessionAdminCheck")
const sessionUserRestrict = require ("../middlewares/sessionUserRestrict")




router.get('/register', sessionUserRestrict,usersController.register)
router.post('/register',multerAvatar.any(),sessionUserRestrict,registerValidator, usersController.procesoRegister)

router.get('/login',sessionUserRestrict, usersController.login)
router.post('/login',sessionUserRestrict,loginValidator, usersController.procesoLogin)

router.get('/profile', sessionUserCheck, usersController.profile);
router.put('/updateProfile/:id',multerAvatar.any(),sessionUserCheck,usersController.updateProfile);

router.get('/logout',sessionUserCheck,usersController.logout);

router.get('/admin/:id',sessionAdminCheck,usersController.admin);

router.put('/editar/:id',multerAvatar.any(),sessionAdminCheck,usersController.editar);
router.delete('/delete/:id',sessionUserCheck,usersController.eliminar);



module.exports = router