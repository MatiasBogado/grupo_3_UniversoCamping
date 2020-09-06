const dbProducts = require('../data/products');
const dbUsers = require('../data/usuarios');

const {validationResult, body} = require('express-validator');
const bcrypt =require('bcrypt');
const fs = require('fs');
const path = require('path');

const users = {
    register:function(req,res) {
        res.render('userRegister')
    },
    login:function(req,res) {
        res.render('userLogin')
    },
    profile:function(req,res){
        res.render('userProfile',{
            title:"Perfil de Usuario",
            productos: dbProducts
            })
        }
}

module.exports = users;