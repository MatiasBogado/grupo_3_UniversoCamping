module.exports = function sessionAdminCheck(req,res,next){
    if(req.session.user){
        if(req.session.user.rol == "admin"){
            next()
        } else{
            res.redirect('/')
        }            
    }else{
        res.redirect('/users/login')
    }  
}