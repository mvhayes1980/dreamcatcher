const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres"
})


sequelize.authenticate().then(() => {
    console.log("Connected to postgres database")
}, err => {
    console.error(err);
})

//db associations setup
const userModel = sequelize.import('./models/userModel');
const dreamModel = sequelize.import('./models/dreamModel');
const commentModel = sequelize.import('./models/commentModel');

userModel.hasMany(dreamModel);
dreamModel.belongsTo(userModel);

dreamModel.hasMany(commentModel);
commentModel.belongsTo(dreamModel);

userModel.hasMany(commentModel);
commentModel.belongsTo(userModel);

module.exports = sequelize;