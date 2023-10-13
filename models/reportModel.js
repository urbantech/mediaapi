const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Report extends Model {}

Report.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    videoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'videos',
            key: 'id'
        }
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
    modelName: 'report',
    timestamps: true
});

module.exports = Report;

