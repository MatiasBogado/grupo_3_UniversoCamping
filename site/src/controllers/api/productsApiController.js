const db = require('../../database/models');


const products = {
    all:function(req,res) {
        db.Products.findAll({
            include:[{association:"categoria"}]
        })
        .then((respuesta) => {  
            let lista=[];
            respuesta.forEach(element => {
                lista.push(element.precio)
            });
            let precioTotal= lista.reduce(function(total,valor) {
              return total+valor;
            })
            /* Array que llega al front */
            let producto= {
                cantidad: respuesta.length,
                precioTotal: precioTotal,
                productos:respuesta,
                ultimoProducto: respuesta[respuesta.length-1]
            }
            res.json(producto)
        })
        .catch((error) => res.send(error))
}
}

module.exports = products;