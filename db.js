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

userModel.hasMany(dreamModel);
dreamModel.belongsTo(userModel);

dreamModel.hasMany(commentModel);
commentModel.belongsTo(dreamModel);

userModel.hasMany(commentModel);
commentModel.belongsTo(userModel);

console.log("about to export from db");
module.exports = sequelize;