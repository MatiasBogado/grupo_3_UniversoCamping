const {check,validationResult,body} = require('express-validator')
const dbUsers = require('../data/usuarios');

module.exports = [
    check('nombre')
    .isLength({
        min:1
    })
    .withMessage('Ingresa tu nombre'),

    check('apellido')
    .isLength({
        min:1
    })
    .withMessage('Ingresa tu apellido'),

    check('email')
    .isEmail()
    .withMessage('ingresa un e-mail válido'),

    body('email')
    .custom(function(value){
        for(let i = 0; i<dbUsers.length;i++){
            if(dbUsers[i].email == value){
                return false
            }
        }
        return true
    })
    .withMessage('Este mail ya está registrado'),
    
    check('contraseña')
    .isLength({
        min:6,
        max:12,
    })
    .withMessage('La contraseña no es valida'),

    body('contraseña2')
    .custom(function(value,{req}){
        if(value != req.body.contraseña){
            return false
        }
        return true
    })
    .withMessage('Las contraseñas no coinciden'),

    check('bases')
    .isString('on')
    .withMessage('tenes aceptar las bases y condiciones')
]