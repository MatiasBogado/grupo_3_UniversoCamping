const db = require("../database/models")

const { check, validationResult, body } = require('express-validator')

module.exports = [
    check('title')
        .isLength({
            min: 5
        })
        .withMessage('El titulo debe tener al menos 5 carácteres'),

    check('description')
        .isLength({
            min: 20
        })
        .withMessage('La descripción debe tener al menos 20 carácteres'),

    check('nameEdit')
        .isLength({
            min: 5
        })
        .withMessage('El titulo debe tener al menos 5 carácteres'),

    check('descriptionEdit')
        .isLength({
            min: 20
        })
        .withMessage('La descripción debe tener al menos 20 carácteres'),


]