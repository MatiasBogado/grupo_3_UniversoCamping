const dbProducts = require('../data/products');
const dbUsers = require('../data/usuarios');

const {validationResult, body} = require('express-validator');
const bcrypt =require('bcrypt');
const fs = require('fs');
const path = require('path');

const users = {
    register:function(req,res) {
        res.render('userRegister',{
            title: 'Crear Cuenta',
            user:req.session.user
        })
    },
    procesoRegister:function(req,res){
        let errors = validationResult(req);
        let lastID = 0;
        if(dbUsers.length > 0){
            dbUsers.forEach(user=>{
                if(user.id > lastID){
                    lastID = user.id
                }
            })
        }
        if(errors.isEmpty()){
            let nuevoUsuario = {
                id:lastID+1,
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                email:req.body.email,
                avatar:(req.files[0])?req.files[0].filename:"default.png",
                contraseña:bcrypt.hashSync(req.body.contraseña,10),
                rol:"user"
            }

            dbUsers.push(nuevoUsuario);

            fs.writeFileSync(path.join(__dirname,'..','data','users.json'),JSON.stringify(dbUsers),'utf-8')
            return res.redirect('/users/login')
        }else{
            res.render('userRegister',{
                title: 'Crear Cuenta',
                errors:errors.mapped(),
                old:req.body,
                user:req.session.user
            })
        }
    },
    login:function(req,res) {
        res.render('userLogin',{
            title: 'Iniciar Sesion',
            user:req.session.user
        })
    },
    procesoLogin:function(req,res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            dbUsers.forEach(usuario=>{
                if(usuario.email == req.body.email){
                    req.session.user = {
                        id:usuario.id,
                        nick:usuario.nombre + ' ' + usuario.apellido,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        rol:usuario.rol,
                        email:usuario.email,
                        avatar:usuario.avatar
                    }
                }
            })
            if(req.body.recordar){
                res.cookie('userUniversoCamping',req.session.user,{maxAge:1000*60*60*24})
            }
            return res.redirect('/')
        }else{
            return res.render('userLogin',{
                errors: errors.mapped(),
                old:req.body,
                user:req.session.user

            })
        }
    },
    logout:function(req,res){
        req.session.destroy();
        if(req.cookies.userUniversoCamping){
            res.cookie('userUniversoCamping','',{maxAge:-1})
        }
        res.redirect('/')
    },
    profile:function(req,res){
        res.render('userProfile',{
            title:"Perfil de Usuario",
            productos: dbProducts,
            user:req.session.user
            })
        },
        admin:function(req,res,next){
            let idUser = req.params.id;
            let show = req.params.show
            let usersTotales= dbUsers
            let resultado = dbUsers.filter(user =>{
                return user.id == idUser
            })
            res.render("adminUsers",{
                title: "Administracion de Usuarios",
                usuario: resultado[0],
                total: dbUsers.length,
                show: show,
                usersTotales: usersTotales,
                user:req.session.user
            })
          },
      editar: (req, res) => {
        dbUsers.forEach(user => {
            if (user.id == req.params.id){
              user.nombre = req.body.nombre.trim(),
              user.apellido = req.body.apellido.trim(),
              user.rol= req.body.rol.trim(),
              user.avatar = (req.files[0]?req.files[0].filename:user.avatar),
              user.edad = req.body.edad,
              user.email = req.body.email,
              user.pais = req.body.pais,
              user.localidad = req.body.localidad
              
            }
        })
        usersJSON = JSON.stringify(dbUsers)

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json') , usersJSON)

        res.redirect('/users/admin/' + req.params.id)
  },
  eliminar:function(req,res){
      let idUser = req.params.id;
      let aEliminar;
      dbUsers.forEach(usuario=>{
          if(usuario.id == idUser){
              aEliminar = dbUsers.indexOf(usuario)
          }
      })
      dbUsers.splice(aEliminar,1)
      fs.writeFileSync(path.join(__dirname,'..','data','users.json'),JSON.stringify(dbUsers));
      res.redirect('/users/admin/1')
  }
}

module.exports = users;