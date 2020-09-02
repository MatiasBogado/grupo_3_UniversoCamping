const products = {
    productDetail:function(req,res){
        res.render('productDetail')
    },
    productCart:function(req,res){
        res.render('productCart')
    },
    productAdd:function(req,res){
        res.render('productAdd')
    },
    productAddProfile:function(req,res){
        res.render('productAddProfile')
    },
    productAdm:function(req,res){
        res.render('productAdm')
    },
    productShow:function(req,res){
        res.render('productShow')
    },
    
}

module.exports = products;