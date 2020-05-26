module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}