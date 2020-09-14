const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

const sessionUserCheck = require("../middlewares/sessionUserCheck")

const multerProduct = require("../middlewares/multerProduct")

router.get('/Cart', productsController.enCarrito)
router.get('/carritoCompras/', productsController.enCarrito)
router.put('/agregarAlCarrito/:id',multerProduct.any(),productsController.agregarAlCarrito);
router.put('/retiraDelCarrito/:id',productsController.retiraDelCarrito);

router.get('/', productsController.listar)
router.get('/detail/:id', productsController.productDetail)
router.get('/search',productsController.buscar);


router.get('/add',sessionUserCheck, productsController.addView)
router.post('/add',multerProduct.any(),sessionUserCheck,productsController.agregar)

router.get('/show/:id',sessionUserCheck,productsController.show);
router.put('/edit/:id',multerProduct.any(),sessionUserCheck,productsController.editar);
router.delete('/delete/:id',sessionUserCheck,productsController.eliminar);



module.exports = router




