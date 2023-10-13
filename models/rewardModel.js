const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Reward extends Model {}

Reward.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    points: {
        type: DataTypes.INTEGER,
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
    modelName: 'reward',
    timestamps: true
});

module.exports = Reward;

