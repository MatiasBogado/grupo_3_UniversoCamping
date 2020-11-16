const dbProducts = require('../data/products');
const dbUsers = require('../data/usuarios');

const db = require("../database/models");

const { validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const users = {
    register: function (req, res) {
        res.render('userRegister', {
            title: 'Crear Cuenta',
        })
    },
    procesoRegister: function (req, res) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            db.Users.create(
                {
                    nombre: req.body.nombre.trim(),
                    apellido: req.body.apellido.trim(),
                    email: req.body.email.trim(),
                    password: bcrypt.hashSync(req.body.contraseña.trim(), 10),
                    avatar: (req.files[0]) ? req.files[0].filename : "default.png",
                    rol: "user"
                }
            )
                .then(result => {
                    console.log(result)
                    if (req.session) {
                        return res.redirect('/users/admin/1')
                    } else {
                        return res.redirect('/users/login');
                    }
                })
                .catch(errores => {
                    console.log(errores)
                })

        } else {
            res.render('userRegister', {
                title: 'Crear Cuenta',
                errors: errors.mapped(),
                old: req.body,
            })
        }
    },
    login: function (req, res) {
        res.render('userLogin', {
            title: 'Iniciar Sesion',
        })
    },
    procesoLogin: function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {

            db.Users.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then(user => {
                    req.session.user = {
                        id: user.id,
                        nick: user.nombre + " " + user.apellido,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        avatar: user.avatar,
                        rol: user.rol
                    }
                    if (req.body.recordar) {
                        res.cookie('userUniversoCamping', req.session.user, { maxAge: 1000 * 60 * 60 * 24 })
                    }
                    res.locals.user = req.session.user;
                    return res.redirect('/')
                })
        } else {
            return res.render('userLogin', {
                errors: errors.mapped(),
                old: req.body,

            })
        }
    },
    logout: function (req, res) {
        req.session.destroy();
        if (req.cookies.userUniversoCamping) {
            res.cookie('userUniversoCamping', '', { maxAge: -1 })
        }
        res.redirect('/')
    },
    profile: function (req, res) {
        if (req.session.user) {
            db.Users.findByPk(req.session.user.id)
                .then(user => {
                    
                    res.render('userProfile', {
                        title: "Perfil de Usuario",
                        productos: dbProducts,
                        user: user
                    })

                })


        } else {
            return res.redirect("/")
        }

    },
    updateProfile: function (req, res) {
        db.Users.update(
            {
                fecha: req.body.fecha,
                dni:req.body.dni,
                avatar: (req.files[0]) ? req.files[0].filename : req.session.user.avatar,
                direccion: (req.body.direccion != "") ? req.body.direccion.trim() : null,
                ciudad: (req.body.ciudad != "") ? req.body.ciudad.trim() : null,
                provincia: (req.body.provincia != "") ? req.body.provincia.trim() : null
            },
            {
                where: {
                    id: req.params.id
                }
            }

        )
            .then(result => {
                console.log(result)
                return res.redirect('/users/profile')
            })
            .catch(errors => {
                console.log(errors)
            })
    },

    admin: function (req, res, next) {

        db.Users.findAll()
            .then(users => {

                let resultado = users.filter(user => {
                    return user.id == req.params.id
                });

                res.render("adminUsers", {
                    title: "Administracion de Usuarios",
                    usuario: resultado[0],
                    total: users.length,
                    usersTotales: users,
                })
            })
            .catch(errors => {
                res.send(errors)
            })



    },
    /* EDIT DE LA PARTE ADMINISTRACION */
    editar: (req, res, next) => {
        db.Users.update({
            nombre: req.body.nombre.trim(),
            apellido: req.body.apellido.trim(),
            rol: req.body.rol.trim(),
            avatar: (req.files[0] ? req.files[0].filename : req.session.user.avatar),
            dni:req.body.dni,
            edad: req.body.edad,
            email: req.body.email,
            direccion: (req.body.direccion != "") ? req.body.direccion.trim() : null,
            ciudad: (req.body.ciudad != "") ? req.body.ciudad.trim() : null,
            provincia: (req.body.provincia != "") ? req.body.provincia.trim() : null
        },
            {
                where: {
                    id: req.params.id
                }
            }
        )
            .then(result => {
                console.log(result);
                return res.redirect('/users/admin/' + req.params.id)
            })
            .catch(errors => {
                console.log(errors);
            })

    },
    eliminar: function (req, res) {
        //borrar el archivo de imagen de perfil
        if (fs.existsSync('public/images/avatares/' + req.session.user.avatar) && req.session.user.avatar != "default.png") {
            fs.unlinkSync('public/images/avatares/' + req.session.user.avatar)
        }
        //eliminar los productos que tenga en carrito
        db.Carts.destroy({
            where: {
                id_user : req.session.user.id
            }
        })
        //cerrar la session y borrar cookie
        if (req.session.user.rol != "admin") {
            req.session.destroy();
            if (req.cookies.userMercadoLiebre) {
                res.cookie('userMercadoLiebre', '', { maxAge: -1 });
            }
        }
        //borrar el registro de la base de datos
        db.Users.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.redirect('/users/admin/1')
    }
}

module.exports = users;