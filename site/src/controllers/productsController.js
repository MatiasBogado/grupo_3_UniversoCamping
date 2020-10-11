const db = require('../database/models');
const dbProduct = require('../data/products');
const dbCategories = require('../data/category')


const fs = require('fs');
const path = require('path');

const products = {
    
    agregar:function(req,res,next){
        
        db.Products.create({
            nombre: req.body.name.trim(),
            precio:Number(req.body.price),
            descuento:Number(req.body.discount),
            descripcion:req.body.description.trim(),
            imagenes: (req.files[0])?req.files[0].filename:"default-image.png"
        })
        res.redirect('/products')
},

listar: function(req,res) {
    db.Products.findAll()
    .then(function(productos){
        return res.render('products', {
            title: "Todos los Productos",
            productos: productos,
            user:req.session.user
        }) //muestra información de prueba
    })
    
},

addView:function(req,res){
    //NO TOMA CATEGORIAS, ARREGLAR
    db.Categories.findAll()
    .then(function(categorias){
        return res.render('productAdd',{
            categorias:categorias,
            user:req.session.user
        })
    })
    
    
},
    productDetail:function(req,res){
        db.Products.findOne({
            where:{
                id:req.params.id
            }
        })
    .then(function(producto){
        return res.render('productDetail',{
            title:"Detalle del Producto",
            producto:producto,
            user:req.session.user
        })
    })},
    buscar:function(req,res){},
    enCarrito: function(req, res) {
        let productoEnCarrito = dbProduct.filter(producto => {
            return producto.AgregadoAlCarrito == true
        })        
        
        res.render('productCart', { 
            title: 'Carrito de Compras', 
            productoEnCarrito: productoEnCarrito,
            user:req.session.user         
        })
    },
    agregarAlCarrito: function(req,res){
        let idproducto = req.params.id;

        dbProduct.forEach(producto=>{
            if(producto.id ==idproducto){
                producto.AgregadoAlCarrito = true;
            }
        })
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(dbProduct),'utf-8');               
         res.redirect('/products/carritoCompras/')
    },
    retiraDelCarrito:function(req,res){          
        let idproducto = req.params.id;

        dbProduct.forEach(producto=>{
            if(producto.id ==idproducto){
                producto.AgregadoAlCarrito = false;
            }
        })              
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(dbProduct),'utf-8'); 
        res.redirect('/products/carritoCompras/')
    },
    show:function(req,res){
        
       let id = db.Products.findByPk(req.params.id)
       let todos = db.Products.findAll()
       Promise.all([id,todos])
       .then(function([idProd,todosProd]){
        res.render('productShow',{
            title:"Ver/Editar Producto",
            producto:idProd,
            total:todosProd.length,
            productDb:todosProd,
            user:req.session.user
        })
       })
        
    },
    editar:function(req,res){
        db.Products.update({
            nombre: req.body.name.trim(),
            precio:Number(req.body.price),
            descuento:Number(req.body.discount),
            descripcion:req.body.description.trim(),
            imagenes: (req.files[0])?req.files[0].filename:"default-image.png"
        },{
            where:{
                id:req.params.id
            }
        })
        res.redirect('/products/admin/'+req.params.id)
    },
    eliminar:function(req,res){
        db.Products.destroy({
            where:{
                id:req.params.id
            }
        })
        res.redirect('/products')
    },
    admin:function(req,res){
    let show = req.params.show
    let id = db.Products.findByPk(req.params.id)
    let todos = db.Products.findAll()
    Promise.all([id,todos])
    .then(function([idProd,todosProd]){
        res.render('adminProducts',{
        title:"Ver/Editar Producto",
        producto:idProd,
        total:todosProd.length,
        show: show,
        productosTotales:todosProd,
        user:req.session.user
    })
  })
}

}

module.exports = products;