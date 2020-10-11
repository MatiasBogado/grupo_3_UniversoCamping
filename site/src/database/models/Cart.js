module.exports = (sequelize, dataTypes) => {

    let alias = "carrito"

    let cols ={
        id:{
            type:dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey:true
        },
        remito:{
            type:dataTypes.INTEGER(11),
            allowNull: false,
        },
        cantidad:{
            type:dataTypes.INTEGER(11),
            allowNull: false,
        },
        id_user: {
            type:dataTypes.STRING(100),
            allowNull:false
        },
        
    }

    let config = {
        tableName: "cart",
        timestamps:false,
    }

    
    const Cart = sequelize.define(alias,cols,config);

    Cart.associate = function(models){
        Cart.hasMany(models.Products,{
            as:"producto",
            foreignKey:"id"
        })
        Cart.hasMany(models.Users,{
            as:"usuario",
            foreignKey:"id"
        })
    }
    
    return Cart
}