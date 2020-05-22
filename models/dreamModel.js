module.exports = (sequelize, DataTypes) => {
    return sequelize.define('log', {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isNSFW: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}