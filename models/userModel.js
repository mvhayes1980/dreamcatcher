module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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