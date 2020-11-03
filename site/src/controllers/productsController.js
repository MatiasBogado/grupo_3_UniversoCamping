const db = require('../database/models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const products = {

    agregar: function (req, res, next) {
        let errores = validationResult(req);
        if (errores.isEmpty()) {
            db.Products.create({
                nombre: req.body.title.trim(),
                precio: Number(req.body.price),
                descuento: Number(req.body.discount),
                descripcion: req.body.description.trim(),
                imagenes: (req.files[0]) ? req.files[0].filename : "default.jpg",
                id_category: req.body.category,
                stock: req.body.stock

            })
                .then(result => {
                    console.log(result)
                    res.redirect('/products')
                })

                .catch(errores => {
                    console.log(errores)
                })
        }else{
            res.redirect("/products/admin/1#agregarProducto")
        }
    },

    listar: function (req, res) {
        db.Products.findAll()
            .then(function (productos) {
                return res.render('products', {
                    title: "Todos los Productos",
                    productos: productos,
                    user: req.session.user
                }) //muestra información de prueba
            })
            .catch(errores => {
                console.log(errores)
            })

    },

    addView: function (req, res) {
        db.Categories.findAll()
            .then(function (categorias) {
                return res.render('productAdd', {
                    categorias: categorias,
                    user: req.session.user
                })
            })
            .catch(errores => {
                console.log(errores)
            })


    },
    productDetail: function (req, res) {
        db.Products.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(function (producto) {
                return res.render('productDetail', {
                    title: "Detalle del Producto",
                    producto: producto,
                    user: req.session.user
                })
            })
            .catch(errores => {
                console.log(errores)
            })
    },
    buscar: function (req, res) { },
    enCarrito: function (req, res) {
        let productoEnCarrito = dbProduct.filter(producto => {
            return producto.AgregadoAlCarrito == true
        })

        res.render('productCart', {
            title: 'Carrito de Compras',
            productoEnCarrito: productoEnCarrito,
            user: req.session.user
        })
    },
    agregarAlCarrito: function (req, res) {
        let idproducto = req.params.id;

        dbProduct.forEach(producto => {
            if (producto.id == idproducto) {
                producto.AgregadoAlCarrito = true;
            }
        })
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(dbProduct), 'utf-8');
        res.redirect('/products/carritoCompras/')
    },
    retiraDelCarrito: function (req, res) {
        let idproducto = req.params.id;

        dbProduct.forEach(producto => {
            if (producto.id == idproducto) {
                producto.AgregadoAlCarrito = false;
            }
        })
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(dbProduct), 'utf-8');
        res.redirect('/products/carritoCompras/')
    },
    show: function (req, res) {

        let id = db.Products.findByPk(req.params.id)
        let todos = db.Products.findAll()
        Promise.all([id, todos])
            .then(function ([idProd, todosProd]) {
                res.render('productShow', {
                    title: "Ver/Editar Producto",
                    producto: idProd,
                    total: todosProd.length,
                    productDb: todosProd,
                    user: req.session.user
                })
            })
            .catch(errores => {
                console.log(errores)
            })

    },
    editar: function (req, res) {
        let errores = validationResult(req);
        if (errores.isEmpty()) {
        db.Products.update({
            nombre: req.body.nameEdit.trim(),
            precio: Number(req.body.priceEdit),
            descuento: Number(req.body.discountEdit),
            descripcion: req.body.descriptionEdit.trim(),
            imagenes: (req.files[0]) ? req.files[0].filename : "default.jpg",
            id_category: Number(req.body.categoriaEdit),
            stock: req.body.stockEdit
        }, {
            where: {
                id: req.params.id
            }
        })  
        .then(result => {
            console.log(result)
            res.redirect('/products/admin/'+req.params.id+"#detalleProducto")
        })
        .catch(errores => {
            console.log(errores)
        })
        }else{
        res.redirect('/products/admin/' + req.params.id + "#editarProducto")
        }
    },
    eliminar: function (req, res) {
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/products/admin/1')
    },
    admin: function (req, res) {
        let show = req.params.show
        let id = db.Products.findByPk(req.params.id, {
            include: [{ association: "categoria" }]
        })
        let todos = db.Products.findAll({
            include: [{ association: "categoria" }]
        })
        let categorias = db.Categories.findAll()
        let ventas = db.Ventas.findAll()
        Promise.all([id, todos, categorias, ventas])
            .then(function ([idProd, todosProd, categoriasProd, ventaProd]) {
                res.render('adminProducts', {
                    title: "Ver/Editar Producto",
                    producto: idProd,
                    total: todosProd.length,
                    show: show,
                    productosTotales: todosProd,
                    categorias: categoriasProd,
                    ventas: ventaProd
                })
            })
            .catch(errores => {
                console.log(errores)
            })
    },
    categoriesAdd: function (req, res, next) {
        let errores = validationResult(req);
        if (errores.isEmpty()) {
            db.Categories.create({
                nombre: req.body.nombre
            })

                .then(result => {
                    console.log(result)
                    res.redirect('/products/admin/1')
                })

                .catch(errores => {
                    console.log(errores)
                })

        }
    },
    CategoriesEditar: function (req, res, next) {
        db.Categories.update({
            nombre: req.body.category
        })
            .then(result => {
                console.log(result)
                res.redirect("/products/admin/1");
            })
            .catch(errores => {
                console.log(errores)
            })

    }

}

module.exports = products;