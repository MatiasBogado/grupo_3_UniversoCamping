const dbUsers = require('../data/usuarios');

module.exports = function(req,res,next){
    if(req.cookies.userUniversoCamping){
        req.session.user = req.cookies.userUniversoCamping;
        next()
    }else{
        next()
    }
}