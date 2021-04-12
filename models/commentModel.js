const DataTypes = require('sequelize').DataTypes;
module.exports = (sequelize) => {
    return sequelize.define('comment', {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}