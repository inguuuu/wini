module.exports = (sequelize,DataTypes)=>(
    sequelize.define(`businesstrip`,{
        type : {
            type : DataTypes.STRING(40),
            allowNull : true,
            unique : false,
        },
        place : {
            type : DataTypes.STRING(40),
            allowNull : true,
        },
        start_date : {
            type : DataTypes.STRING(40),
            allowNull : true,
        },
        end_date : {
            type : DataTypes.STRING(40),
            allowNull : true,
        },
        reason : {
            type : DataTypes.STRING(40),
            allowNull : true,
        },
    },{
        timestamps : true,
        paranoid:true,
    })
);
