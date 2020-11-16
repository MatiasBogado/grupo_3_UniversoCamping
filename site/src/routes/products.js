const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

const sessionUserCheck = require("../middlewares/sessionUserCheck")
const sessionAdminCheck = require("../middlewares/sessionAdminCheck")
const productsAddValidator = require('../validators/productsAddValidator')
const productsEditValidator = require('../validators/productsEditValidator')
const multerProduct = require("../middlewares/multerProduct")
const multerCategories = require("../middlewares/multerCategories")

router.get('/cart',sessionUserCheck,productsController.enCarrito)
router.put('/agregarAlCarrito/:id',sessionUserCheck,multerProduct.any(),productsController.agregarAlCarrito);
router.put('/retiraDelCarrito/:id',sessionUserCheck,productsController.retiraDelCarrito);
router.put('/deleteAllCarrito',sessionUserCheck,productsController.deleteAllCarrito);
router.get('/cart/confirm',sessionUserCheck,productsController.confirm);
router.put('/cart/confirm',sessionUserCheck,productsController.confirm);



router.get('/', productsController.listar)
router.get('/detail/:id', productsController.productDetail)
router.get('/search',productsController.buscar);

router.post('/categories/add',multerCategories.any(),sessionAdminCheck,productsController.categoriesAdd);
router.put('/categories/edit/:id',multerCategories.any(),sessionAdminCheck,productsController.CategoriesEditar);
router.delete('/categories/delete/:id',sessionAdminCheck,productsController.categoriesEliminar);

router.get('/add',sessionAdminCheck, productsController.addView)
router.post('/add',multerProduct.any(),productsAddValidator,sessionAdminCheck,productsController.agregar)

router.get('/show/:id',sessionAdminCheck,productsController.show);
router.put('/edit/:id',multerProduct.any(),productsEditValidator,sessionAdminCheck,productsController.editar);
router.delete('/delete/:id',sessionAdminCheck,productsController.eliminarProd);

router.get('/admin/:id?',sessionAdminCheck,productsController.admin);




module.exports = router




