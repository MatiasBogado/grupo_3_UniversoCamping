const { check, validationResult, body } = require('express-validator')

module.exports = [
    check("categoriaEdit")
    .isNumeric()
    .isLength({
        min: 1
    }),
    check('nameEdit')
        .isLength({
            min: 5
        }),

    check('descriptionEdit')
        .isLength({
            min: 20
        }),
    check("priceEdit")
        .isNumeric()
        .isLength({
            min: 1
        }),

    check("discountEdit")
        .isNumeric(),

    check("stockEdit")
        .isNumeric()
        .isLength({
            min: 1
        }),
]