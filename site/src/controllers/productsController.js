const dbProduct = require('../data/products'); //requiero la base de datos de productos
const categorias =require('../data/category')

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
            producto:producto[0],
            user:req.session.user
        })
    },
    buscar:function(req,res){
        let buscar = req.query.search;
        if(buscar == ""){
            res.redirect("/")
        }else{
        let resultados=[];
        dbProduct.forEach(producto=>{
            if(producto.name.toLowerCase().includes(buscar.toLowerCase()) || producto.description.toLowerCase().includes(buscar.toLowerCase()) || producto.category.toLowerCase().includes(buscar.toLowerCase())){
                resultados.push(producto)
            }
        })
        res.render('products',{
            title:"Resultado de la busqueda",
            productos:resultados,
            user:req.session.user
        })
    }
    },
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
    listar: function(req, res) {
        res.render('products', {
                title: "Todos los Productos",
                productos: dbProduct,
                user:req.session.user
            }) //muestra información de prueba
    },
    show:function(req,res){
        let idProducto = req.params.id;
        let resultado = dbProduct.filter(producto =>{
            return producto.id == idProducto
        })
        res.render('productShow',{
            title: "Ver/Editar Producto",
            producto: resultado[0],
            total: dbProduct.length,
            productDb : dbProduct,
            categorias: categorias,
            user:req.session.user
        })
    },
    addView:function(req,res){
        res.render('productAdd',{
            user:req.session.user
        })
        
    },
    agregar:function(req,res,next){
        
        let lastID = 1;

        dbProduct.forEach(producto=>{
            if(producto.id > lastID){
                lastID = producto.id
            }
        })

        let newProduct ={
            id: lastID + 1,
            name: req.body.name.trim(),
            price:Number(req.body.price),
            discount:Number(req.body.discount),
            category:req.body.category.trim(),
            description:req.body.description.trim(),
            image: (req.files[0])?req.files[0].filename:"default-image.png"
        }

        dbProduct.push(newProduct);
        
        fs.writeFileSync(path.join(__dirname,"..",'data',"products.json"),JSON.stringify(dbProduct),'utf-8')
        
        res.redirect('/products')
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
    }
}

module.exports = products;