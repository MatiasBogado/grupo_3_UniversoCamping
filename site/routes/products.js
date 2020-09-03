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

router.get('/detail/:id', productsController.productDetail)
router.get('/Cart', productsController.productCart)
router.get('/Add', productsController.productAdd)
router.get('/', productsController.listar)


router.get('/show/:id',productsController.show);
router.put('/edit/:id',upload.any(),productsController.editar);
router.delete('/delete/:id',productsController.eliminar);



module.exports = router