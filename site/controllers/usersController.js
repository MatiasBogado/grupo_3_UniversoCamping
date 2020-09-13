const dbProducts = require('../data/products');
const dbUsers = require('../data/usuarios');

const {validationResult, body} = require('express-validator');
const bcrypt =require('bcrypt');
const fs = require('fs');
const path = require('path');

const users = {
    register:function(req,res) {
        res.render('userRegister',{
            title: 'Crear Cuenta'

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
                old:req.body
    
            })
        }
    },
    login:function(req,res) {
        res.render('userLogin',{
            title: 'Iniciar Sesion'

        })
    },
    procesoLogin:function(req,res){

    },
    profile:function(req,res){
        res.render('userProfile',{
            title:"Perfil de Usuario",
            productos: dbProducts
            })
        }
}

module.exports = users;