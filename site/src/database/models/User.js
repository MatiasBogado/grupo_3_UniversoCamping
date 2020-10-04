module.exports = (sequelize, dataTypes) => {

    let alias = "Users"

    let cols =  {
        id:{
            type:dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey:true
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
    
    return User
}