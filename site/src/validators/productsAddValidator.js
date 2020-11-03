const db = require("../database/models")

const { check, validationResult, body } = require('express-validator')

module.exports = [
    check("categoria")
    .isNumeric()
    .isLength({
        min: 1
    }),

    check('title')
        .isLength({
            min: 5
        }),

    check('description')
        .isLength({
            min: 20
        }),

    check("price")
        .isNumeric()
        .isLength({
            min: 1
        }),

    check("discount")
        .isNumeric(),

    check("stock")
        .isNumeric()
        .isLength({
            min: 1
        }),






]