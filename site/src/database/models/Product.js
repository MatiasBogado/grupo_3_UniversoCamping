const category = require("../../data/category");

module.exports = (sequelize, dataTypes) => {

    let alias = "Products"

    let cols ={
        id:{
            type:dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey:true
        },
        nombre: {
            type:dataTypes.STRING(100),
            allowNull:false
        },
        precio: {
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        descuento: {
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        descripcion: {
            type:dataTypes.STRING(300),
            allowNull:false
        },
        imagenes: {
            type:dataTypes.STRING(100),
            allowNull:false
        },
        id_user: {
            type:dataTypes.STRING(100),
            allowNull:true
        },
        id_category: {
            type:dataTypes.STRING(100),
            allowNull:false
        }
        
    }

    let config = {
        tableName: "products",
        timestamps:true,
        underscored:true
    }

    
    const Product = sequelize.define(alias,cols,config);
    
    Product.associate = function(models){
        Product.belongsTo(models.Categories,{
            as:"categoria",
            foreignKey:"id_category"
        })
        /*Product.belongsTo(models.Users,{
            as:"usuario",
            foreignKey:"id_user"
        })
        Product.belongsTo(models.carrito,{
            as:"carrito",
            foreignKey:"id_product"
        })*/
        
    }

    return Product
}