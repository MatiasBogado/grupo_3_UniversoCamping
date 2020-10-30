const db = require('../../database/models');


const users = {
    all:function(req,res) {
        db.Users.findAll()
        .then((respuesta) => {
            let usuarios= {
                cantidad: respuesta.length,
            }
            res.json(usuarios)
        })
        .catch((error) => res.send(error))
}
}

module.exports = users;