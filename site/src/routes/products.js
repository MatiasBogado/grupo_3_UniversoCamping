const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

const sessionUserCheck = require("../middlewares/sessionUserCheck")
const sessionAdminCheck = require("../middlewares/sessionAdminCheck")
const productsAddValidator = require('../validators/productsAddValidator')
const productsEditValidator = require('../validators/productsEditValidator')
const multerProduct = require("../middlewares/multerProduct")

router.get('/Cart', productsController.enCarrito)
router.get('/carritoCompras/', productsController.enCarrito)
router.put('/agregarAlCarrito/:id',multerProduct.any(),productsController.agregarAlCarrito);
router.put('/retiraDelCarrito/:id',productsController.retiraDelCarrito);

router.get('/', productsController.listar)
router.get('/detail/:id', productsController.productDetail)
router.get('/search',productsController.buscar);

router.post('/categories/add',productsController.categoriesAdd);
router.put('/categories/edit/:id',productsController.CategoriesEditar);
router.get('/add',sessionAdminCheck, productsController.addView)
router.post('/add',multerProduct.any(),productsAddValidator,sessionAdminCheck,productsController.agregar)

router.get('/show/:id',sessionAdminCheck,productsController.show);
router.put('/edit/:id',multerProduct.any(),productsEditValidator,sessionAdminCheck,productsController.editar);
router.delete('/delete/:id',sessionAdminCheck,productsController.eliminar);

router.get('/admin/:id?',sessionAdminCheck,productsController.admin);




module.exports = router




