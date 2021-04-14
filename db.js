const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL+ "?sslmode=require", {
    dialect: "postgres",
    dialectOptions: {
        ssl: (process.env.PG_USER == "postgres") ? null : {require: true, rejectUnauthorized: false}
    }
})


// sequelize.authenticate().then(() => {
//     console.log("Connected to postgres database")
// }, err => {
//     console.error(err);
// })

//db associations setup
const userModel = require('./models/userModel')(sequelize);
const dreamModel = require('./models/dreamModel')(sequelize);
const commentModel = require('./models/commentModel')(sequelize);

// console.log("------------------------USER MODEL OUTPUT THINGY", userModel.hasMany(dreamModel));
dreamModel.belongsTo(userModel);
userModel.hasMany(dreamModel);

commentModel.belongsTo(dreamModel);
dreamModel.hasMany(commentModel);

commentModel.belongsTo(userModel);
userModel.hasMany(commentModel);

console.log("DB ASSOCIATIONS SET UP");
module.exports = sequelize;