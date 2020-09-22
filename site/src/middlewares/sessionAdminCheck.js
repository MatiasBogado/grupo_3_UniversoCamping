module.exports = function sessionUserChech(req,res,next){
    if(req.session.user){
        if(req.session.user.rol == "admin"){
            next()
        } else{
            res.redirect('/users/login')
        }            
    }
}