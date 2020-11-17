module.exports = (sequelize, dataTypes) => {

    let alias = "Users"

    let cols =  {
        id : {
            type : dataTypes.INTEGER(11).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        nombre:{
            type:dataTypes.STRING(45),
            allowNull: false
        },
        apellido:{
            type:dataTypes.STRING(45),
            allowNull: false
        },
        email:{
            type:dataTypes.STRING(45),
            allowNull: false
        },
        password:{
            type:dataTypes.STRING(100),
            allowNull: false
        },
        dni:{
            type:dataTypes.INTEGER(11),
        },
        fecha:{
            type:dataTypes.DATEONLY(),
        },
        avatar:{
            type:dataTypes.STRING(45),
        },
        direccion:{
            type:dataTypes.STRING(45)
        },
        ciudad:{
            type:dataTypes.STRING(45)
        },
        provincia:{
            type:dataTypes.STRING(45)
        },
        rol:{
            type:dataTypes.STRING(45)
        }
    }

    let config = {
        tableName: "users",
        timestamps:true,
        underscored:true
    }

    
    const User = sequelize.define(alias,cols,config);
    

    User.associate = function(models){
        /*  usuario tiene un carrito */
        User.hasOne(models.Carts,{
            as: "carts",
            foreignKey:"id_user"
        }),
        User.belongsToMany(models.Products,{
            /* muchos usuarios le pertenece a muchos productos*/
            as : 'productos', 
            through : 'ventas',
            foreignKey : 'id_users',//la clave foranea de este modelo en esa tabla intermedia
            otherKey : 'id_products'//la otra clave foranea del otro modelo en cuestion en esa tabla intermedia
        })/* ,
        User.hasOne(models.Ventas,{
            as: "ventas",
            foreignKey:"id_user"
        }) */
    }

/*     User.associate = function(models){
        User.hasMany(models.Products,{
            as:"productos",
            foreignKey:"id_user"
        })
        User.hasMany(models.carrito,{
            as:"carrito",
            foreignKey:"id_user"
        })
    } */

    return User
}