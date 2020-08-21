const products = {
    productDetail:function(req,res){
        res.render('productDetail')
    },
    productCart:function(req,res){
        res.render('productCart')
    },
    productAdd:function(req,res){
        res.render('productAdd')
    }
}

module.exports = products;