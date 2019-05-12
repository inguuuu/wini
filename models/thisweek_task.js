module.exports = (sequelize,DataTypes)=>(
    sequelize.define(`thisweek_task`,{
        business_name: {
            type : DataTypes.STRING(40),
            allowNull : true,
            unique : false,
        },
        term : {
            type : DataTypes.STRING(40),
            allowNull : true,
        },
        place : {
            type : DataTypes.STRING(40),
            allowNull : true,
        },
    },{
        timestamps : true,
        paranoid:true,
    })
);