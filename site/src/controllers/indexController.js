const dbProduct = require('../data/products'); //requiero la base de datos de productos
const categorias =require('../data/category')
const db = require('../database/models');


const index = {
    index:function(req,res) {
        db.Products.findAll({
            include:[{association:"categoria"}]
        })
        .then(function(productosDat){
            return res.render('index', {
                productos: productosDat,
                user:req.session.user
            }) //muestra información de prueba
        })
    }
}

module.exports = index;