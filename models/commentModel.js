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
        dreamID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}