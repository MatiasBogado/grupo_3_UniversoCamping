const db = require('../../database/models');


const categories = {
    all:function(req,res) {
        db.Categories.findAll()
        .then((respuesta) => {

            let categories= {
                cantidad: respuesta.length,
                categorias: respuesta,
                ultimaCategoria:respuesta[respuesta.length-1]
            }
            res.json(categories)
        })
        .catch((error) => res.send(error))
}
}

module.exports = categories;