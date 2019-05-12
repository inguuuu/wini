module.exports = (sequelize,DataTypes)=>(
    sequelize.define(`businessinfo`,{
        bus_name : {
            type : DataTypes.STRING(40),
            allowNull : true,
            unique : false,
        },
        bus_term : {
            type : DataTypes.STRING(40),
            allowNull : true,
        },
    },{
        timestamps : false,
        paranoid:false,
    })
);