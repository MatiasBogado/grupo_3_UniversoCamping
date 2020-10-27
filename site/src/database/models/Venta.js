
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Ventas"

    let cols = {
        id : {
            type : dataTypes.INTEGER(11).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        id_users: {
            type : dataTypes.INTEGER(11).UNSIGNED,
            allowNull : false
        },
        id_products :{
            type : dataTypes.INTEGER(11).UNSIGNED,
            allowNull : false
        },
        cantidad:{
            type:dataTypes.INTEGER(11),
            allowNull: false,
        }

    }

    let config = {
        tableName : 'ventas',
        timestamps : true,
        underscored : true
    }

    const Ventas = sequelize.define(alias,cols,config);
    
    /* no estoy seguro si hay que agregar asociaciones aca */

    return Ventas
}