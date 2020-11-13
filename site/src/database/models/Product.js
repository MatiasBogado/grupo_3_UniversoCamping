module.exports = (sequelize, dataTypes) => {

    let alias = "Products"

    let cols ={
        id : {
            type : dataTypes.INTEGER(11).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
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
        stock: {
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        id_category: {
            type:dataTypes.INTEGER(11).UNSIGNED,
            
        }
        
    }

    let config = {
        tableName: "products",
        timestamps:true,
        underscored:true
    }

    
    const Product = sequelize.define(alias,cols,config);
    

    Product.associate = function(models){
        
        Product.hasOne(models.Carts,{
            as:"cart",
            foreignKey:"products_id"
        })
        /* producto pertenece a una categoria */
        Product.belongsTo(models.Categories,{
            as:"categoria",
            foreignKey:"id_category"
        }),
        Product.belongsToMany(models.Users,{
            /* muchos productos le pertenece a muchos admines*/
            as : 'admin', 
            through : 'ventas',
            foreignKey : 'id_products',//la clave foranea de este modelo en esa tabla intermedia
            otherKey : 'id_users'//la otra clave foranea del otro modelo en cuestion en esa tabla intermedia
        });
    }

/*     Product.associate = function(models){
        Product.belongsTo(models.Categories,{
            as:"categoria",
            foreignKey:"id"
        })
        Product.belongsTo(models.Users,{
            as:"usuario",
            foreignKey:"id"
        })    } */
        


    return Product
}