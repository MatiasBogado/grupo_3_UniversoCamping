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
    enCarrito: function(req, res) {
        let productoEnCarrito = dbProduct.filter(producto => {
            return producto.AgregadoAlCarrito == true
        })        
        
        res.render('productCart', { 
            title: 'Carrito de Compras', 
            productoEnCarrito: productoEnCarrito         
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
    productAdd:function(req,res){
        let category = req.body.category;
        let producto = dbProduct.filter(producto=>{
            return producto.category == category
        })
        console.log(producto)
        res.render('productAdd',{
            title:"Productos Publicados",
            producto:producto[0]
        })
    },
       
    
    listar: function(req, res) {
        res.render('products', {
                title: "Todos los Productos",
                productos: dbProduct
            }) //muestra información de prueba
    },
    show:function(req,res){
        let idProducto = req.params.category;
        let resultado = dbProduct.filter(producto =>{
            return producto.category == idProducto
        })
        res.render('productShow',{
            title: "Ver/Editar Producto",
            
            producto: resultado[0],
            total: producto.category.length,
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
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(dbProduct),'utf-8');
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
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(dbProduct));
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