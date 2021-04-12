const DataTypes = require('sequelize').DataTypes;
module.exports = (sequelize) => {
    return sequelize.define('dream', {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // owner: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isNSFW: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}