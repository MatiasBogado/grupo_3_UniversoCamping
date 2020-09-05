const dbProduct = require('../data/products'); //requiero la base de datos de productos

const fs = require('fs');
const path = require('path');

const products = {
    productDetail:function(req,res){
        let id = req.params.id;
        let producto = dbProduct.filter(producto=>{
            return producto.id == id
        })
        console.log(producto)
        res.render('productDetail',{
            title:"Detalle del Producto",
            producto:producto[0]
        })
    },
    productCart:function(req,res){
        res.render('productCart')
    },
    productAdd:function(req,res){
        res.render('productAdd')
    },
    listar: function(req, res) {
        res.render('products', {
                title: "Todos los productos",
                productos: dbProduct
            }) //muestra información de prueba
    },
    show:function(req,res){
        let idProducto = req.params.id;
        let resultado = dbProduct.filter(producto =>{
            return producto.id == idProducto
        })
        res.render('productShow',{
            title: "Ver/Editar Producto",
            css:'products.css',
            producto: resultado[0],
            total: dbProduct.length,
        })
    },
    editar:function(req,res){
        let idProducto = req.params.id;
        dbProduct.forEach(producto =>{
            if(producto.id == idProducto){
                producto.id = Number(req.body.id);
                producto.name = req.body.name.trim();
                producto.price = Number(req.body.price);
                producto.discount = Number(req.body.discount);
                producto.category = req.body.category.trim();
                producto.description = req.body.description.trim();
                producto.image = (req.files[0]?req.files[0].filename:producto.image)
            }
        })
        fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(dbProduct),'utf-8');
        res.redirect('/products/show/'+ idProducto)
    },
    eliminar:function(req,res){
        let idProducto = req.params.id;
        let aEliminar;
        dbProduct.forEach(producto=>{
            if(producto.id == idProducto){
                aEliminar = dbProduct.indexOf(producto)
            }
        })
        dbProduct.splice(aEliminar,1)
        fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(dbProduct));
        res.redirect('/users/profile')
    },
    productAddProfile:function(req,res){
        res.render('productAddProfile')
    },
    productAdm:function(req,res){
        res.render('productAdm')
    },
    productShow:function(req,res){
        res.render('productShow')
    },
    
}

module.exports = products;