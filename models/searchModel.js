const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Search extends Model {}

Search.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    query: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'search',
    timestamps: true
});

module.exports = Search;

