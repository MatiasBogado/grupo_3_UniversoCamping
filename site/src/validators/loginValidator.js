const db = require("../database/models")

const {check,validationResult,body} = require('express-validator');
const bcrypt = require('bcrypt')

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    body('email')
    .custom(function(value){
        return db.Users.findOne({
            where:{
                email:value
            }
        })
        .then(user =>{
            if(!user){
                return Promise.reject("Email no registrado")
            }
            })
    }),
    body('contraseña')
    .custom(function(value,{req}){
        return db.Users.findOne({
            where:{
                email:req.body.email
            }
        })
        .then(user =>{
            if(!bcrypt.compareSync(value,user.dataValues.password)){
                return Promise.reject()
            }
        })
        .catch(()=>{
            return Promise.reject("Contraseña incorrecta")
        })
    })
 
]