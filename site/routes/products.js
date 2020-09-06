const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/img/products')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage})

router.get('/Cart', productsController.enCarrito)
router.get('/carritoCompras/', productsController.enCarrito)
router.put('/agregarAlCarrito/:id',upload.any(),productsController.agregarAlCarrito);
router.put('/retiraDelCarrito/:id',productsController.retiraDelCarrito);

router.get('/', productsController.listar)
router.get('/detail/:id', productsController.productDetail)
router.get('/search',productsController.buscar);


router.get('/add', productsController.addView)
router.post('/add',upload.any(),productsController.agregar)

router.get('/show/:id',productsController.show);
router.put('/edit/:id',upload.any(),productsController.editar);
router.delete('/delete/:id',productsController.eliminar);



module.exports = router




