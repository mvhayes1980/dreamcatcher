const sequelize = require('./db');
const userModel = require('./models/userModel')(sequelize);
const dreamModel = require('./models/dreamModel')(sequelize);
const commentModel = require('./models/commentModel')(sequelize);

dreamModel.belongsTo(userModel);
userModel.hasMany(dreamModel);

commentModel.belongsTo(dreamModel);
dreamModel.hasMany(commentModel);

commentModel.belongsTo(userModel);
userModel.hasMany(commentModel);
console.log("DB ASSOCIATIONS SET UP");

module.exports = {userModel, dreamModel, commentModel}


// console.log("------------------------USER MODEL OUTPUT THINGY", userModel.hasMany(dreamModel));

