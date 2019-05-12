module.exports = (sequelize,DataTypes)=>(
    sequelize.define(`nextweek_detailtask`,{
        step: {
            type : DataTypes.STRING(40),
            allowNull : true,
            unique : false,
        },
        task_content : {
            type : DataTypes.STRING(40),
            allowNull : true,
        },
        term : {
            type : DataTypes.STRING(40),
            allowNull : true,
        },
        detail_content : {
            type : DataTypes.STRING(100),
            allowNull : true,
        },
    },{
        timestamps : true,
        paranoid:true,
    })
);