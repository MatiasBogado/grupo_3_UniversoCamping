const dbProduct = require('../data/products'); //requiero la base de datos de productos

const index = {
    index:function(req,res) {
        let producto = dbProduct
        res.render('index',{
            producto:producto,
            user:req.session.user
        })
    }
}

module.exports = index;