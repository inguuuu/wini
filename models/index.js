const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`../config/config`)[env];
const db = {};

const sequelize = new Sequelize(
  config.database,config.username,config.password,config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//DB생성
db.User = require(`./user`)(sequelize,Sequelize);
db.BusinessInfo = require(`./businessinfo`)(sequelize,Sequelize);
db.Thisweek_task = require('./thisweek_task')(sequelize,Sequelize) ;
db.Thisweek_detailtask = require('./thisweek_detailtask')(sequelize,Sequelize) ;
db.Vacation = require('./vacation')(sequelize,Sequelize);
db.Nextweek_task = require('./nextweek_task')(sequelize,Sequelize) ;
db.Nextweek_detailtask = require('./nextweek_detailtask')(sequelize,Sequelize) ;
db.Businesstrip = require('./businesstrip')(sequelize,Sequelize);
db.Issue = require('./issue')(sequelize,Sequelize);

//db.Issue = require('./issue')(sequelize,Sequelize);
//DB 관계설정

db.User.hasMany(db.Thisweek_detailtask, {
  foreignKey : 'detail_writer' , sourceKey : 'id'
});
db.Thisweek_detailtask.belongsTo(db.User,{
  foreignKey : 'detail_writer' , targetKey : 'id'
});

db.User.hasMany(db.Nextweek_detailtask, {
  foreignKey : 'detail_writer' , sourceKey : 'id'
});
db.Nextweek_detailtask.belongsTo(db.User,{
  foreignKey : 'detail_writer' , targetKey : 'id'
});

db.User.hasMany(db.Thisweek_task, {
  foreignKey : 'writer' , sourceKey : 'id'
});
db.Thisweek_task.belongsTo(db.User,{
  foreignKey : 'writer' , targetKey : 'id'
});

db.User.hasMany(db.Nextweek_task, {
  foreignKey : 'writer' , sourceKey : 'id'
});
db.Nextweek_task.belongsTo(db.User,{
  foreignKey : 'writer' , targetKey : 'id'
});

db.Thisweek_task.hasMany(db.Thisweek_detailtask,{
  foreignKey : 'business_number',sourceKey : 'id'
});
db.Thisweek_detailtask.belongsTo(db.Thisweek_task,{
  foreignKey : 'business_number' , targetKey : 'id'
});

db.Nextweek_task.hasMany(db.Nextweek_detailtask,{
  foreignKey : 'business_number',sourceKey : 'id'
});
db.Nextweek_detailtask.belongsTo(db.Nextweek_task,{
  foreignKey : 'business_number' , targetKey : 'id'
});
/////////////////////////////////////
db.User.hasMany(db.Vacation, {
  foreignKey : 'vacationuser' , sourceKey : 'id'
});
db.Vacation.belongsTo(db.User,{
  foreignKey : 'vacationuser' , targetKey : 'id'
});

db.User.hasMany(db.Businesstrip, {
  foreignKey : 'bustripuser' , sourceKey : 'id'
});
db.Businesstrip.belongsTo(db.User,{
  foreignKey : 'bustripuser' , targetKey : 'id'
});
//다음주 사업

//휴가,출장,이슈 사업

db.User.hasMany(db.Issue, {
  foreignKey : 'writer' , sourceKey : 'id'
});
db.Issue.belongsTo(db.User,{
  foreignKey : 'writer' , targetKey : 'id'
});



module.exports =db;
