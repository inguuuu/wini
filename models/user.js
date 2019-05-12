module.exports = (sequelize,DataTypes)=>(
    sequelize.define(`user`,{
        email: {
            type : DataTypes.STRING(40),
            allowNull : true,
            unique : true,
        },
        password : {
            type : DataTypes.STRING(100),
            allowNull : true,
        },
        name : {
            type : DataTypes.STRING(40),
            allowNull : true,
        },
        teamname : {
            type : DataTypes.STRING(40),
            allowNull : true,
        },
    },{
        timestamps : false,
        paranoid: false,
    })
);