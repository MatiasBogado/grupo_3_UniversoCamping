module.exports = (sequelize, dataTypes) => {

    let alias = "Categories"

    let cols ={
        id : {
            type : dataTypes.INTEGER(11).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        nombre: {
            type:dataTypes.STRING(45),
            allowNull:false
        },
        imagen:{
            type:dataTypes.STRING(45),
        }
    }

    let config = {
        tableName: "categories",
        timestamps:false,
    }

    
    const Category = sequelize.define(alias,cols,config);

    Category.associate = function(models){
        /* categoria tiene muchos  productos */
        Category.hasMany(models.Products,{
            as:"productos",
            foreignKey:"id_category"
        })
    }
    
    return Category
}