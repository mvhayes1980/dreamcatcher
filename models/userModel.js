module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull:false
        },
        nsfwOk: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        profilePic: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}