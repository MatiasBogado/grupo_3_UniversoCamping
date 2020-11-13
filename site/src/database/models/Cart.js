const User = require("./User");

module.exports = (sequelize, dataTypes) => {

    let alias = "Carts"

    let cols ={
        id : {
            type : dataTypes.INTEGER(11).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        remito:{
            type:dataTypes.INTEGER(11)
        },
        cantidad:{
            type:dataTypes.INTEGER(11)
        },
        id_user: {
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        products_id: {
            type:dataTypes.INTEGER(11),
            allowNull:false
        }
        
    }

    let config = {
        tableName: "cart",
        timestamps:false,
    }

    
    const Cart = sequelize.define(alias,cols,config);

    Cart.associate = function(models){
        /* carrito le pertenece a un usuario */
        Cart.belongsTo(models.Users,{
            as:"Users",
            foreignKey:"id_user"
        })
        
        Cart.belongsTo(models.Products,{
            as:"productos",
            foreignKey:"products_id"
        })

    }

/*     Cart.associate = function(models){
        Cart.hasMany(models.Products,{
            as:"producto",
            foreignKey:"id"
        })
        Cart.hasMany(models.Users,{
            as:"usuario",
            foreignKey:"id"
        })
    } */
    
    return Cart
}