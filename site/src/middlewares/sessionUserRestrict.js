module.exports = function sessionUserRestrict(req,res,next){
    if(req.session.user){
        res.redirect('/')
    }else{
        next()     
    }
}