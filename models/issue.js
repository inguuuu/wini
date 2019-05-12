module.exports = (sequelize,DataTypes)=>(
    sequelize.define(`issue`,{
        content: {
            type : DataTypes.STRING(80),
            allowNull : true,
            unique : false,
        },
    },{
        timestamps : true,
        paranoid:true,
    })
);
