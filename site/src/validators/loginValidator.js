const dbUsers = require('../data/usuarios');

const {check,validationResult,body} = require('express-validator');
const bcrypt = require('bcrypt')

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    body('email')
    .custom(function(value){
       let usuario = dbUsers.filter(function(usuario){
           return usuario.email == value
       })

       if(usuario == false){
           return false
       }else{
           return true
       }
    })
    .withMessage('El usuario no está regisrado'),
    
    body('contraseña')
    .custom(function(value,{req}){
        let result = true;
        dbUsers.forEach(user => {
            if(user.email == req.body.email){
                if(!bcrypt.compareSync(value,user.contraseña)){
                    result = false
                }
            }
        });
        if (result == false){
            return false
        }else{
            return true
        }
    })
    .withMessage("Contraseña incorrecta")
]