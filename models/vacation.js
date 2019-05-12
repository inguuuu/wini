module.exports = (sequelize,DataTypes)=>{
    return sequelize.define(`vacation`,{
        type : {
            type : DataTypes.STRING(40),
            allowNull : true,
            unique : false,
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
};
